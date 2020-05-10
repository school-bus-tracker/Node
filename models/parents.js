const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  EmailID: {
    type: String,
    maxlength: 30,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  FirstName: {
    type: String,
    minlength: 5,
    maxlength: 60,
    required: true,
  },
  LastName: {
    type: String,
    minlength: 5,
    maxlength: 60,
    required: true,
  },
  Password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
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
  IsActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  SchoolAdminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolAdmins",
    required: true,
  },
});

parentSchema.methods.generateAuthToken = function (isParent) {
  const token = jwt.sign({ _id: this._id, isParent }, config.get("privateKey"));
  return token;
};

const Parent = mongoose.model("Parents", parentSchema);

function validateParent(parent) {
  const schema = Joi.object({
    EmailID: Joi.string().trim().max(30).email().required(),
    FirstName: Joi.string().trim().min(5).max(60).required(),
    LastName: Joi.string().trim().min(5).max(60).required(),
    Password: Joi.string().trim().min(8).max(1024).alphanum().required(),
    MobileNumber: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .required(),
    Address: Joi.string().trim().min(10).max(200).required(),
    IsActive: Joi.bool().required(),
    SchoolAdminID: Joi.string().trim().required(),
  });

  return schema.validate(parent);
}

module.exports.Parent = Parent;
module.exports.validate = validateParent;
