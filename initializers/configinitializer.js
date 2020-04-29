const config = require("config");

module.exports = function () {
  if (!config.get("privateKey")) {
    throw new Error("FATAL ERROR-> privateKey has not been set");
  }
  if (!config.get("dbUser")) {
    throw new Error("FATAL ERROR-> dbUser has not been set");
  }

  if (!config.get("dbPassword")) {
    throw new Error("FATAL ERROR-> dbPassword has not been set");
  }
  if (!config.get("db")) {
    throw new Error("FATAL ERROR-> db has not been set");
  }
};
