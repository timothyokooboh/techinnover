const User = require("../../models/User");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Validation Schema
const LoginSchema = joi.object().keys({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required()
})

const login = async(req, res) => {
    // Validate user's request
    const {error} = LoginSchema.validate(req.body)

    if(error) return res.status(400).json({error: error.details[0].message})

    // check if user exists
    const user = await User.findOne({email: req.body.email})

    if(!user) return res.status(401).json({error: "Email address does not exist in the database"})

    // check if password matches with the password in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(401).json({error: "invalid password"});

    // create token that expires after 120 minutes
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: "120m"});

    res.json({data: user, token: token})
}

module.exports.login = login

