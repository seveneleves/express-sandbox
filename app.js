require("dotenv").config();
const express = require("express");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const index = require("./routes/index");
const userRoutes = require("./api/user");
const connection = require("./config/dbConnect");
const User = require("./models/User.model");
const { engine } = require("express-handlebars");
const { validatePassword } = require("./utils/password");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize session
app.use(
    sessions({
        secret: process.env.SECRET,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            autoRemove: "native",
        }),
    })
);

// Express-handlebard configuration
app.set("view engine", "hbs");
app.engine(
    "hbs",
    engine({
        partialsDir: __dirname + "/views/partials",
        layoutsDir: __dirname + "/views/layouts",
        extname: "hbs",
        defaultLayout: "main",
    })
);
app.use(express.static("public"));

// Routes

// @        /
// desc     Views
app.use("/", index);

// @        /login
// desc     POST - Check user credentials
// TODO     Implement logic
app.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.redirect("/register");
            } else {
                const isValid = validatePassword(
                    password,
                    user.salt,
                    user.hash
                );
                if (isValid) {
                    req.session.userId = user._id.valueOf();
                    res.redirect("/");
                } else {
                    res.status(404).send("Wrong password. Please try again.");
                }
            }
        })
        .catch((err) => console.error(err));
});

// @        /logout
// desc     Logout endpoint
app.get("/logout", (req, res, next) => {
    req.session.destroy();
    res.redirect("/login");
});

// @        /api/user
// desc     User CRUD endpoints
app.use("/api/user", userRoutes);

// Listener function
app.listen(process.env.PORT, () =>
    console.log(`> Server is listening on port ${process.env.PORT}`)
);
