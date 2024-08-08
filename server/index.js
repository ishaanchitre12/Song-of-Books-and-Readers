const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 4000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register and login routes
app.use("/auth", require("./routes/jwtAuth"));

// get books route
app.use("/books", require("./routes/books"))

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})