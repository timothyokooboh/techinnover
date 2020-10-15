const User = require("../../models/User");
const joi = require("joi");
const jwt = require("jsonwebtoken");

// Method for verifying token during auto login on the frontend
const autoLogin = async (req, res) => {
    // validation schema
    const Schema = joi.object().keys({
        token: joi.string().required(),
        userId: joi.string().required()
    })

    // Check if token exists in req.body
    const {error} = Schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    try {
        // Check if token is valid
        jwt.verify(req.body.token, process.env.TOKEN_SECRET)

        // if token is valid, fetch the specific user

        try {
            const user = await User.findById({_id: req.body.userId})
            res.status(200).send(user)
        }
        catch(err) {
            res.status(400).send(err)
        }

    }
    catch(err) {
        res.status(401).send(err)
    }
}


module.exports.autoLogin = autoLogin