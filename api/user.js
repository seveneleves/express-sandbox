const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

//  @       /api/user/:id
//  desc    Get user information provided id
router.get("/:id", (req, res, next) => {
    const userId = req.params.id;

    // Check if userId is rightly formatted
    if (mongoose.isValidObjectId(userId)) {
        User.findById(userId)
            .then((user) => res.send(user))
            .catch((err) => console.error(err));
    } else {
        res.status(404).send(
            "User not found. Please try with a different user id."
        );
    }
});

//  @       /api/user/new
//  desc    Create user in database
router.post("/new", (req, res, next) => {
    const { username, password } = req.body;
    const newUser = new User({
        username: username,
        password: password,
    });

    newUser
        .save()
        .then((user) => res.send("User saved!"))
        .catch((err) => console.error(err));
});

module.exports = router;
