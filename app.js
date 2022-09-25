require("dotenv").config();
const express = require("express");
const userRoutes = require("./api/user");
const connection = require("./utils/dbConnect");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @        /api/user
// desc     User CRUD routes
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () =>
    console.log(`> Server is listening on port ${process.env.PORT}`)
);
