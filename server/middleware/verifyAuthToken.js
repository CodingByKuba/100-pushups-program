const jwt = require("jsonwebtoken");
const models = require("../models");
const errors = require("../data/errors");

module.exports = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).send({ error: errors.AUTHENTICATION_ERROR });

  let searchTokenInRevoked = await models.RevokedToken.findOne({
    authToken: authHeader,
  });
  if (searchTokenInRevoked)
    return res.status(401).send({ error: errors.AUTHENTICATION_ERROR });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({ error: errors.AUTHENTICATION_ERROR });
    req.body.user = user;
    next();
  });
};
