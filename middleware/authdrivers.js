const jwt = require("jsonwebtoken");
const config = require("config");

async function AuthDriver(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("privateKey"));
    if (decoded.isDriver || decoded.isSchoolAdmin || decoded.isSuperUser) {
      const loginLogs = new LoginLogs({
        EmailID: decoded.EmailID,
        FirstName: decoded.FirstName,
        LastName: decoded.LastName,
      });

      await loginLogs.save();
      req.driver = decoded;
      next();
    } else return res.status(401).send("Access denied");
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
}

module.exports = AuthDriver;
