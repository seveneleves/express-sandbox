const isAuth = (req, res, next) => {
    const session = req.session;
    if (session.userId) {
        next();
    } else {
        res.redirect("/");
    }
};

module.exports = isAuth;
