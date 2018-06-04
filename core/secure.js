const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const debug = require("debug")("app:core:secure");

const { JWT_TOKEN_SECRET } = require("./config");

const createTokenString = (data) => {
    //  TODO: refactor code with async/await
    return new Promise((resolve, reject) => {
        JWT.sign(
            data,
            TOKEN_SECRET,
            { expiresIn: "7 days" },
            (error, token) => {
                if (error) return reject(error);

                resolve(token);
            }
        );
    });
}

const passwordHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const passwordVerify = async ({ plainPassword, hashedPassword }) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// To be use as middleware for verifying token 
// in authenticated routes
ensureAuthenticated(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        (req.headers["authorization"]
            ? req.headers["authorization"].split(" ")[1]
            : null);

    // TODO: token blacklisting goes here (if need arise)

    if (!token) {
        debug("Missing token");

        return res.json(
            util.createJsonError(401, "You are unauthenticated.")
        );
    }

    debug("access token", token);

    JWT.verify(token, TOKEN_SECRET, (err, data) => {
        if (err) {
            debug("Invalid token");

            // TODO:  sign-in failures activity logging goes here

            return res
                .status(401)
                .json(
                    util.createJsonError(401, "You are unauthenticated.")
                );
        }

        debug("token data", data);
        req.userId = data.user.id;
        next();
    });
}


module.exports = {
    createTokenString,
    passwordHash,
    passwordVerify
}