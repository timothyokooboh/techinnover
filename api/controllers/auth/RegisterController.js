const User =  require("../../models/User")
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Validation Schemas for the request body

const UserSchema = joi.object().keys({
    firstName: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    age: joi.number().min(18).max(65).required(),
    dob: joi.string().trim().required(),
    password: joi.string().trim().min(8).required(),
    familyMembers: joi.array()
})

const register = async(req, res) => {
    // validate the request body
    const {error} = UserSchema.validate(req.body);

    if(error) return res.status(400).json({error: error.details[0].message});

   console.log(req.file.path)

    // Check if email already exists
    const emailExists = await User.findOne({email: req.body.email});

    if(emailExists) return res.status(400).json({error: "email address already exists"});

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // save user's details
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        dob: req.body.dob,
        passportPhoto: req.file.path,
        familyMembers: JSON.parse(req.body.familyMembers)
    })

    try {
        const savedUser = await user.save();

        // create a token that expires after 120 minute
        const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET, {expiresIn: "120m"})
        res.json({data: savedUser, token: token});
    }
    catch(error) {
        res.status(400).json({error: error})
    }
    
}

module.exports.register = register

