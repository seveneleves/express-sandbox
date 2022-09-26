const crypto = require("crypto");

const genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const genHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

    return {
        hash: genHash,
        salt: salt,
    };
};

const validatePassword = (password, salt, hash) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return hashVerify === hash;
};

module.exports = {
    genPassword,
    validatePassword,
};
