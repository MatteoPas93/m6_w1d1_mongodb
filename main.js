const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = 3028;

const app = express();

// !Import di Routes

const authorRoute = require("./routes/authors");

// !Sezione middleware

app.use(express.json());

app.use("/", authorRoute);

//! Connessione del Database

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind("Database connection error!"));
db.once("open", () => {
  console.log("Database successfully connected!");
});

app.listen(PORT, () =>
  console.log(`Server connected on port ${PORT}`)
);
