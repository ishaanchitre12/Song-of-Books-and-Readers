const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            // check if jwt token does not exist
            res.status(403).send("Not authorized (token does not exist)");
        } else {
            // check if jwt is valid
            const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
            req.user = payload.user;
            next();
        }
    } catch (err) {
        console.log(err.message);
        res.status(403).send("Not authorized");
    }
}