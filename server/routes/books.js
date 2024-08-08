const router = require("express").Router();
const authorization = require("../middleware/authorization");
const db = require("../db");

router.get("/", authorization, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM booksdata WHERE id = $1", [req.user]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send("Server error");
    }
})

module.exports = router;