const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config({ path: "./config.env" });
const path = require("path");

const UserModel = require("./models/userModel");
const TrailModel = require("./models/trailsModel");

const app = express();
const jwtScret = "fadfafgdfgdfsghfdhdjhgjgk1122304";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads/", express.static(`${__dirname}/uploads/`)); // <-- used to handle uploaded photos
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
mongoose.connect(
    process.env.MONGO_URL
    // "mongodb+srv://kaiiemsawat:Kinkin3710@cluster0.48awedd.mongodb.net/trails?retryWrites=true&w=majority"
    // { useNewUrlParser: true }
);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        // console.log(__dirname);
        res.sendFile(
            path.join(__dirname, "..", "client", "dist", "index.html")
        );
    });
} else {
    app.get("", (rq, res) => {
        res.send("API running");
    });
}

const PORT = process.env.PORT;

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
    if (!userDoc) {
        console.log("Can not find user in database");
        res.status(400).json("User not founnd");
    } else {
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
            photo: addedPhoto,
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

app.get("/userTrails", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtScret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await TrailModel.find({ poster: id }));
    });
});

app.get("/trails/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await TrailModel.findById(id));
});

app.put("/trails", async (req, res) => {
    const { token } = req.cookies;
    const {
        id,
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

        const trailsDoc = await TrailModel.findById(id);
        if (userData.id === trailsDoc.poster.toString()) {
            trailsDoc.set({
                title,
                location,
                photo: addedPhoto,
                descriptions,
                amenities,
                extraInfo,
                distance,
                difficulty,
                duration,
            });
            await trailsDoc.save();
            res.json("UPDATE OK");
        }
    });
});

app.get("/allTrails", async (req, res) => {
    res.json(await TrailModel.find());
});
app.delete("/deleteTrail/:id", (req, res) => {
    TrailModel.deleteOne({ _id: req.params.id }).catch((err) => {
        res.status(400).json({ message: "something wrong when delete", err });
    });
});

// app.listen(8000);
app.listen(PORT, () => {
    "Connected !!!";
});

/* 
POST /register
POST /login
GET  /profile
POST /logout
POST /uploadByLink
POST /upload
POST /trails
GET  /userTrails
GET  /trails/:id
PUT  /trails
GET  /allTrails
DELETE  /deleteTrail
*/
