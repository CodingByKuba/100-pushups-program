const express = require("express");
const stageRouter = express.Router();

const routes = require("../data/routes");
const resolvers = require("../resolvers");

const { verifyAuthToken } = require("../middleware");

stageRouter.post(routes.STAGE, verifyAuthToken, async (req, res) => {
  res.send(await resolvers.stage.createStage(req.body));
});

stageRouter.delete(routes.STAGE, verifyAuthToken, async (req, res) => {
  res.send(await resolvers.stage.deleteStage(req.body));
});

module.exports = stageRouter;
