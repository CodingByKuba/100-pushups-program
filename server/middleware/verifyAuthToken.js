const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send({ error: "Authentication error" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ error: "Authentication error" });
    req.user = user;
    next();
  });
};
