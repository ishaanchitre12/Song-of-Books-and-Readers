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
            res.redirect("/login");
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
        res.status(500).send("Server error");
    }
})

// login route
router.post("/login", async (req, res) => {
    try {
        // destructure req.body
        const {email, password} = req.body;

        // check if user doesn't exist
        const user = await db.query("SELECT * FROM user WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            res.status(401).send("User does not exist. Try registering instead");
        } else {
            // check password
            const valid = await bcrypt.compare(password, user.rows[0].password);
            if (!valid) {
                res.redirect("/login");
            } else {
                // give jwt token
                const token = jwtGenerator(user.rows[0].id);
                res.json({token});
            }
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
})

router.get("is-verified", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        res.status(500).send("Server error");
    }
})

module.exports = router;