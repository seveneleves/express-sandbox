const User = require("../models/User.model");

const isAuth = (req, res, next) => {
    const session = req.session;
    if (session.userId) {
        next();
    } else {
        res.redirect("/");
    }
};

const isAdmin = (req, res, next) => {
    User.findById(req.session.userId)
        .then((user) => {
            if (user.admin) {
                next();
            } else {
                res.status(401).send(
                    "You are not authorized to view this page."
                );
            }
        })
        .catch((err) => console.error(err));
};

module.exports = {
    isAuth,
    isAdmin,
};
