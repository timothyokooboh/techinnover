const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            min: 18,
            max: 65,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        passportPhoto: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        familyMembers: [
            {
                familyMemberAge: {
                    type: Number
                },
                familyMemberFirstName: {
                    type: String
                },
                familyMemberLastName: {
                    type: String
                },
                relationship: {
                    type: String
                }
            }
        ]
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema);