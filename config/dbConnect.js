const mongoose = require("mongoose");

const connection = mongoose
    .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(
        () => console.log("> DB connected"),
        (err) => console.error(err)
    );

module.exports = connection;
