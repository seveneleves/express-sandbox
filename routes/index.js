const router = require("express").Router();
const { isAuth, isAdmin } = require("../utils/auth");

// @        /
// desc     GET - Home page
router.get("/", (req, res, next) => {
    if (req.session.userId) {
        // Pass firstName as paramer for index.hbs to consume
        res.render("index", {
            name: req.session.name,
        });
    } else {
        res.render("login", { layout: "form" });
    }
});

// @        /login
// desc     GET - Dummy route. Redirects to "/"
router.get("/login", (req, res, next) => {
    res.redirect("/");
});

// @        /register
// desc     GET - Registration page
router.get("/register", (req, res, next) => {
    res.render("register", { layout: "form" });
});

// @        /dashboard
// desc     GET - Dashboard page
router.get("/dashboard", isAuth, isAdmin, (req, res, next) => {
    res.render("dashboard");
});

module.exports = router;
