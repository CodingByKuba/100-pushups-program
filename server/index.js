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
app.use(router.stageRouter);
app.use(router.seriesRouter);

const mongoose = require("mongoose");
const models = require("./models");

mongoose.connect(process.env.DB_HOST);

mongoose.connection.on("connected", async () => {
  console.log("Connected to database...");
  const time = new Date(new Date() - process.env.TOKEN_EXPIRES || 86400000);
  console.time("Cleared old revoked tokens");
  await models.RevokedToken.deleteMany({ createdAt: { $lte: time } });
  console.timeEnd("Cleared old revoked tokens");
});
mongoose.connection.on("error", (error) =>
  console.log("Database connection error: ", error)
);

const PORT = process.env.PORT || 4000;

app.get("/", async (req, res) => res.send({ server: true }));

app.listen(PORT, () => console.log("Server is listening on port " + PORT));
