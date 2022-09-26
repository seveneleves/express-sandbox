const router = require("express").Router();
const mongoose = require("mongoose");
const { genPassword } = require("../utils/password");
const User = require("../models/User.model");

//  @       /api/user/:id
//  desc    Get user information provided id
router.get("/:id", (req, res, next) => {
    const userId = req.params.id;

    // Check if userId is rightly formatted
    if (mongoose.isValidObjectId(userId)) {
        User.findById(userId)
            .then((user) => {
                if (!user) {
                    res.status(404).send("User not found.");
                } else {
                    res.send(user);
                }
            })
            .catch((err) => console.error(err));
    } else {
        res.status(404).send("Please enter a valid ID.");
    }
});

//  @       /api/user/new
//  desc    Create user in database
router.post("/new", (req, res, next) => {
    const { username, password } = req.body;

    const { hash, salt } = genPassword(password);

    const newUser = new User({
        username: username,
        hash: hash,
        salt: salt,
    });

    newUser
        .save()
        .then((user) => res.redirect("/login"))
        .catch((err) => console.error(err));
});

module.exports = router;
