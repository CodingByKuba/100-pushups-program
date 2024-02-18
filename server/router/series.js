const express = require("express");
const seriesRouter = express.Router();

const routes = require("../data/routes");
const resolvers = require("../resolvers");

const { verifyAuthToken } = require("../middleware");

seriesRouter.post(routes.SERIES, verifyAuthToken, async (req, res) => {
  res.send(await resolvers.series.finishSeries(req.body));
});

module.exports = seriesRouter;
