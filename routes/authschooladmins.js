const express = require("express");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { SchoolAdmin } = require("../models/schooladmins");
const { LoginLogs } = require("../models/loginlogs");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const schoolAdmin = await SchoolAdmin.findOne({ EmailID: req.body.EmailID });
  if (!schoolAdmin) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(
    req.body.Password,
    schoolAdmin.Password
  );
  if (!validPassword) return res.status(400).send("Invalid Email or Password");
  if (!req.body.isSchoolAdmin)
    return res.status(400).send("Invalid Email or Password");
  const token = schoolAdmin.generateAuthToken(req.body.isSchoolAdmin);
  res.send(token);
  const loginLogs = new LoginLogs({
    EmailID: req.body.EmailID,
    Persona: "SchoolAdmin",
  });

  await loginLogs.save();
});

function validate(schoolAdmin) {
  const schema = Joi.object({
    EmailID: Joi.string().trim().max(30).email().required(),
    Password: Joi.string().trim().min(8).max(32).alphanum().required(),
    isSchoolAdmin: Joi.bool(),
  });

  return schema.validate(schoolAdmin);
}

module.exports = router;
