const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 2, maxLength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 6 },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
