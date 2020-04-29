const express = require("express");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { Driver } = require("../models/drivers");
const { LoginLogs } = require("../models/loginlogs");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const driver = await Driver.findOne({ EmailID: req.body.EmailID });
  if (!driver) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(
    req.body.Password,
    driver.Password
  );
  if (!validPassword) return res.status(400).send("Invalid Email or Password");
  if (!req.body.isDriver)
    return res.status(400).send("Invalid Email or Password");
  const token = driver.generateAuthToken(req.body.isDriver);
  res.send(token);
  const loginLogs = new LoginLogs({
    EmailID: req.body.EmailID,
    Persona: "Driver",
  });

  await loginLogs.save();
});

function validate(driver) {
  const schema = Joi.object({
    EmailID: Joi.string().trim().max(30).email().required(),
    Password: Joi.string().trim().min(8).max(32).alphanum().required(),
    isDriver: Joi.bool(),
  });

  return schema.validate(driver);
}

module.exports = router;
