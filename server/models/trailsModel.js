const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TrailsSchema = new Schema({
    poster: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, minLength: 2, unique: true },
    location: { type: String, required: true, minLength: 2 },
    photo: [String],
    distance: Number,
    difficulty: Number,
    duration: Number,
    amenities: [String],
    descriptions: String,
    extraInfo: String,
});

const TrailModel = model("Trail", TrailsSchema);

module.exports = TrailModel;
