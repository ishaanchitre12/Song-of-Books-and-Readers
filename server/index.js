const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 4000;
app.use(cors());

db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM booksdata");
    res.json(result.rows);
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})