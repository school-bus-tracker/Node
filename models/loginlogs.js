const mongoose = require("mongoose");

const LoginLogs = mongoose.model(
  "LoginLogs",
  new mongoose.Schema({
    Date: {
      type: String,
      default: Date().toString(),
    },
    EmailID: {
      type: String,
      maxlength: 30,
      required: true,
      trim: true,
      index: true,
    },
    Persona: {
      type: String,
      required: true,
      trim: true,
    },
  })
);

module.exports.LoginLogs = LoginLogs;
