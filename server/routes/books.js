const router = require("express").Router();
const authorization = require("../middleware/authorization");
const db = require("../db");

router.get("/", authorization, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM booksdata WHERE user_id = $1", [req.user]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.get("/edit/:id", authorization, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notesdata WHERE user_id = $1\
            AND book_id = $2", [req.user, req.params.id]);
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json("Server error");
    }
})

module.exports = router;