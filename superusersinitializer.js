const { SuperUser, validate } = require("./models/superusers");
const config = require("config");
const bcrypt = require("bcrypt");

module.exports = async () => {
  try {
    await SuperUser.deleteMany({});

    if (!config.get("superUserPassword")) {
      throw new Error("FATAL ERROR-> db has not been set");
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(config.get("superUserPassword"), salt);

    const superUser = new SuperUser({
      EmailID: "superuser@gmail.com",
      FirstName: "superuser",
      LastName: "untitled",
      Password: password,
      MobileNumber: "1234567891",
    });

    await superUser.save();
  } catch (ex) {
    throw new Error(ex);
  }
};
