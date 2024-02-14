require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

const router = require("./router");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router.accountRouter);

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_HOST);

mongoose.connection.on("connected", () => console.log("Connected to database"));
mongoose.connection.on("error", (error) =>
  console.log("Database connection error: ", error)
);

const PORT = process.env.PORT || 4000;

app.get("/", async (req, res) => res.send({ server: true }));

app.listen(PORT, () => console.log("Server is listening on port " + PORT));
