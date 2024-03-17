const express = require("express");
const accountRouter = express.Router();

const routes = require("../data/routes");
const resolvers = require("../resolvers");

const { verifyAuthToken } = require("../middleware");

accountRouter.post(routes.ACCOUNT, async (req, res) => {
  res.send(await resolvers.account.createAccount(req.body));
});

accountRouter.post(routes.LOGIN, async (req, res) => {
  res.send(await resolvers.account.signIn(req.body));
});

accountRouter.get(routes.ACCOUNT, verifyAuthToken, async (req, res) => {
  let user = await resolvers.account.getUser(req.body);
  let stages = await resolvers.stage.getStages(req.body);
  let series = await resolvers.series.getSeries(req.body);

  res.send({
    user: user,
    stages: stages,
    series: series,
  });
});

accountRouter.post(routes.TOKEN, verifyAuthToken, async (req, res) => {
  res.send(await resolvers.account.refreshToken(req.body));
});

accountRouter.put(routes.ACCOUNT, verifyAuthToken, async (req, res) => {
  res.send(await resolvers.account.updateAccount(req.body));
});

accountRouter.put(routes.LOGIN, verifyAuthToken, async (req, res) => {
  res.send(await resolvers.account.signOut(req.body));
});

module.exports = accountRouter;
