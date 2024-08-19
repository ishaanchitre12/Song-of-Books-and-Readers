const router = require("express").Router();
const authorization = require("../middleware/authorization");
const db = require("../db");
const axios = require("axios");

router.get("/", authorization, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM booksdata WHERE user_id = $1", [req.user]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.get("/:id", authorization, async (req, res) => {
    console.log("called");
    try {
        const result = await db.query("SELECT * FROM booksdata WHERE id = $1", [req.params.id]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.post("/", authorization, async (req, res) => {
    try {
        const {title, author, description, imageLink} = req.body;
        const result = await db.query("INSERT INTO booksdata (title, author, description, imagelink, user_id)\
            VALUES ($1, $2, $3, $4, $5)\
            RETURNING *", [title, author, description, imageLink, req.user]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.delete("/:id", authorization, async (req, res) => {
    const {id} = req.params.id;
    try {
        const books = await db.query("DELETE FROM booksdata WHERE id = $1", [id]);
        const notes = await db.query("DELETE FROM notesdata WHERE book_id = $1", [id]);
        const review = await db.query("DELETE FROM reviews WHERE book_id = $1", [id]);
        res.json(books.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.get("/edit/:id", authorization, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notesdata WHERE book_id = $1", [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json("Server error");
    }
})

router.post("/edit/:id", authorization, async (req, res) => {
    const {noteDate, notes} = req.body;
    try {
        const result = await db.query("INSERT INTO notesdata (note_date, notes, book_id, user_id)\
            VALUES ($1, $2, $3, $4) RETURNING *", [noteDate, notes, req.params.id, req.user]);
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json("Server error");
    }
})

router.patch("/edit/:id", authorization, async (req, res) => {
    const {id, noteDate, notes} = req.body;
    try {
        const result = await db.query("UPDATE notesdata SET note_date = $1, notes = $2\
            WHERE id = $3 RETURNING *", [noteDate, notes, id]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.delete("/edit/:noteId", authorization, async (req, res) => {
    try {
        const result = await db.query("DELETE FROM notesdata WHERE id = $1", [req.params.noteId]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.get("/review/:id", authorization, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM reviews WHERE book_id = $1", [req.params.id]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.post("/review/:id", authorization, async (req, res) => {
    try {
        if (req.body.finished) {
            const {dateFinished, rating} = req.body;
            const result = await db.query("INSERT INTO reviews (date_finished, rating, book_id, user_id)\
                VALUES ($1, $2, $3, $4)\
                RETURNING *", [dateFinished, rating, req.params.id, req.user]);
            res.json(result.rows);
        }
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.patch("/review/:id", authorization, async (req, res) => {
    const {dateFinished, rating} = req.body;
    try {
        const result = await db.query("UPDATE reviews SET date_finished = $1, rating = $2\
            WHERE book_id = $3 RETURNING *", [dateFinished, rating, req.params.id]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

router.delete("/review/:id", authorization, async(req, res) => {
    try {
        const result = await db.query("DELETE FROM reviews WHERE book_id = $1", [req.params.id]);
        res.json(result.rows);
    } catch (err) {
        return res.status(500).json("Server error");
    }
})

module.exports = router;