const router = require("express").Router();
const isAuth = require("../utils/auth");

// @        /register
// desc     GET - Registration page
router.get("/login", (req, res, next) => {
    res.redirect("/");
});

// @        /register
// desc     GET - Registration page
router.get("/register", (req, res, next) => {
    res.render("register", { layout: "form" });
});

// @        /
// desc     GET - Home page
router.get("/", (req, res, next) => {
    if (req.session.userId) {
        res.render("index");
    } else {
        res.render("login", { layout: "form" });
    }
});

// @        /dashboard
// desc     GET - Dashboard page
router.get("/dashboard", isAuth, (req, res, next) => {
    res.render("dashboard");
});

module.exports = router;
