const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
