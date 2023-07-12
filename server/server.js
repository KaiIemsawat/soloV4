const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const UserModel = require("./models/userModel");
const TrailModel = require("./models/trailsModel");

const app = express();
const jwtScret = "fadfafgdfgdfsghfdhdjhgjgk1122304";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads/", express.static(`${__dirname}/uploads/`)); // <-- used to handle uploaded photos
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
mongoose.connect(
    "mongodb+srv://kaiiemsawat:Kinkin3710@cluster0.48awedd.mongodb.net/trails?retryWrites=true&w=majority"
);

app.get("/test", (req, res) => {
    res.json("Test OK");
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userDoc = await UserModel.create({
            username,
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        });

        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email });
    if (userDoc) {
        console.log("Found user in database");
        const isPasswordOk = bcrypt.compareSync(password, userDoc.password);
        if (isPasswordOk) {
            console.log("User provide valid credentials");
            jwt.sign(
                {
                    email: userDoc.email,
                    id: userDoc._id,
                },
                jwtScret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(userDoc);
                }
            );
        } else {
            console.log("Password is incorrect");
            res.json({ message: "invalid credentials" });
        }
    } else {
        console.log("Can not find user in database");
        res.json("User not founnd");
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtScret, {}, async (err, userData) => {
            if (err) throw err;
            const { username, email, _id } = await UserModel.findById(
                userData.id
            );
            res.json({ username, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post("/logout", (erq, res) => {
    res.cookie("token", "").json(true);
});

app.post("/uploadByLink", async (req, res) => {
    const { link } = req.body;
    // console.log(link);

    // Check if the link is image's link
    function isImgUrl(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
    }
    // console.log(isImgUrl(link), " test !!");

    if (isImgUrl(link)) {
        if (link) {
            const newFileName = `photo-${Date.now()}.jpg`;
            await imageDownloader.image({
                url: link,
                dest: __dirname + "/uploads/" + newFileName,
            });
            res.json(newFileName);
        } else {
            res.json("No link provided");
        }
    } else {
        // console.log(`${link},  from app.post("/uploadByLink") `); // <--- check if the link is properly input (part of the validation)
        res.json("Not a proper image link");
    }
});

const photoMidWare = multer({ dest: "uploads/" });

// "photos" need to match with data.set("photos", files); in uploadPhoto() in MyTrail.jsx
// 100 is the limit (can be any other number)
app.post("/upload", photoMidWare.array("photos", 100), (req, res) => {
    const uploadedFiles = [];
    // console.log(req.files);
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const extension = parts[parts.length - 1];
        const newPath = `${path}.${extension}`;
        // console.log(path + " " + newPath);
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
});

app.post("/trails", (req, res) => {
    const { token } = req.cookies;
    const {
        title,
        location,
        addedPhoto,
        descriptions,
        amenities,
        extraInfo,
        distance,
        difficulty,
        duration,
    } = req.body;
    jwt.verify(token, jwtScret, {}, async (err, userData) => {
        if (err) throw err;
        const trailsDoc = await TrailModel.create({
            poster: userData.id,
            title,
            location,
            addedPhoto,
            descriptions,
            amenities,
            extraInfo,
            distance,
            difficulty,
            duration,
        }).catch((err) => {
            res.status(400).json({ err });
        });

        res.json(trailsDoc);
    });
});

app.listen(8000);

/* 
    poster: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, minLength: 2, unique: true },
    location: { type: String, required: true, minLength: 2 },
    photo: [String],
    distance: Number,
    difficulty: Number,
    duration: Number,
    amenities: [String],
    descriptions: String,
    extraInfo: String, */
