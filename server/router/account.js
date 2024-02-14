const express = require("express");
const accountRouter = express.Router();

const routes = require("../data/routes");
const resolvers = require("../resolvers");

accountRouter.post(routes.ACCOUNT, async (req, res) => {
  res.send(await resolvers.account.createAccount(req.body));
});

accountRouter.post(routes.LOGIN, async (req, res) => {
  res.send(await resolvers.account.signIn(req.body));
});

module.exports = accountRouter;
