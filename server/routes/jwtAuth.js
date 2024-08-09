const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");
const db = require("../db");

// register route
router.post("/register", async (req, res) => {
    try {
        // destructuring req.body
        const {email, password} = req.body;

        // check if user already exists
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(401).json("User already exists!");
        } else {
            // bcrypt user password
            const saltRounds = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // add new user to the database
            const newUser = await db.query("INSERT INTO users (email, password)\
                VALUES ($1, $2) RETURNING *", [email, hashedPassword]);

            // generate jwt token for new user
            const token = jwtGenerator(newUser.rows[0].id);
            res.json({token});
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json("ERROR 500: Server error");
    }
})

// login route
router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
        // destructure req.body
        const {email, password} = req.body;

        // check if user doesn't exist
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log(user);
        if (user.rows.length === 0) {
            console.log("fail");
            return res.status(401).json("Email or password is incorrect!");
        } else {
            // check password
            const valid = await bcrypt.compare(password, user.rows[0].password);
            if (!valid) {
                return res.status(401).json("Email or password is incorrect!");
            } else {
                // give jwt token
                const token = jwtGenerator(user.rows[0].id);
                console.log(token);
                res.json({token});
            }
        }
    } catch (err) {
        return res.status(500).json("ERROR 500: Server error");
    }
})

router.get("/verify", authorization, async (req, res) => {
    console.log("received");
    try {
        res.json(true);
    } catch (err) {
        return res.status(500).json("ERROR 500: Server error");
    }
})

module.exports = router;