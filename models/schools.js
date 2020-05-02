const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const School = mongoose.model(
  "Schools",
  new mongoose.Schema({
    Name: {
      type: String,
      minlength: 5,
      maxlength: 60,
      required: true,
      index: true,
      unique: true,
    },
    MobileNumber: {
      type: String,
      match: /^[0-9]{10}$/,
      required: true,
    },
    Address: {
      type: String,
      minlength: 10,
      maxlength: 200,
      required: true,
    },
    EmailID: {
      type: String,
      maxlength: 30,
      required: true,
      trim: true,
      unique: true,
    },
    IsActive: {
      type: Boolean,
      required: true,
    },
    SuperUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperUsers",
      required: true,
    },
  })
);

function validateSchool(school) {
  const schema = Joi.object({
    Name: Joi.string().trim().min(5).max(60).required(),
    MobileNumber: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .required(),
    Address: Joi.string().trim().min(10).max(200).required(),
    EmailID: Joi.string().trim().max(30).email().required(),
    SuperUserID: Joi.string().trim().required(),
  });

  return schema.validate(school);
}

module.exports.School = School;
module.exports.validate = validateSchool;
