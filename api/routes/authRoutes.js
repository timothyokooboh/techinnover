const router = require("express").Router();

const {register} = require("../controllers/auth/RegisterController");
const {login} = require("../controllers/auth/LoginController");
const {autoLogin} = require("../controllers/auth/UsersController");

// The uploaded image will be saved in Cloudinary
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'techinnover',
        format: async (req, file) => "png", // supports promh,
        limits: {
            fileSize: 1000000 // allows only files with max size of 1mb
        },
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        public_id: (req, file) => Date.now(), 
    },
});

const parser = multer({ storage: storage });

// API endpoint for collectionof data
//router.post("/register",  parser.single("image"), register);
router.post("/register", parser.single("image"), register)

// API endpoint for login
router.post("/login", login);
router.post("/validateuser", autoLogin)

module.exports = router;