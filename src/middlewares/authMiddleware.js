const jwt = require("jsonwebtoken");
// const logger = require("../lib/helpers/logger");

exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // logger.info(`/player requireAuth [middleware] token: ${token}`);

  if (!token) {
    return res.status(401).send("No token provided");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.auth = payload;
    // logger.info(`/player requireAuth middleware payload ${payload}`);
    next();
  });
};

exports.validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(chalk.yellow("Validating token:", authHeader));
  if (!authHeader) {
    // console.log(chalk.red("No token provided"));
    return res.status(401).send("No token provided");
  }
  if (!JWT_SECRET) {
    // console.log(chalk.red("JWT_SECRET env is not defined"));
    return res.status(500).send("JWT_SECRET is not defined");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // console.log(chalk.red("Invalid token"));
      return res.status(403).send("Invalid token");
    }
    // console.log(chalk.green("Token is valid for user:", user));
    req.user = user;
    next();
  });
};
