const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

const authRoutes = require("./routes/authRoutes");

app.use("/user", authRoutes);

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => {
        console.log("connected to DB")
    }
)

module.exports = {
    path: "/api",
    handler: app
}