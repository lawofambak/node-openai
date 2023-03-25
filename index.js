const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

// Middleware to enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openai"));

app.listen(8000, console.log("Server started on port 8000"));
