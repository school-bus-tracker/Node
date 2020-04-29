const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const studentClass = [
  "LKG",
  "UKG",
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
  "Eleventh",
  "Twelfth",
];

const Student = mongoose.model(
  "Students",
  new mongoose.Schema({
    RollNumber: {
      type: String,
      maxlength: 15,
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
    Class: {
      type: String,
      enum: studentClass,
      required: true,
    },
    LocationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locations",
      required: true,
    },
    SchoolID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schools",
      required: true,
    },
    BusID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buses",
      required: true,
    },
    ParentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parents",
      required: true,
    },
  })
);

function validateStudent(student) {
  const schema = Joi.object({
    RollNumber: Joi.string().trim().max(15).required(),
    FirstName: Joi.string().trim().min(5).max(60).required(),
    LastName: Joi.string().trim().min(5).max(60).required(),
    Class: Joi.string().trim().required(),
    LocationID: Joi.string().trim().required(),
    SchoolID: Joi.string().trim().required(),
    BusID: Joi.string().trim().required(),
    ParentID: Joi.string().trim().required(),
  });

  return schema.validate(student);
}

module.exports.Student = Student;
module.exports.validate = validateStudent;
module.exports.studentClass = studentClass;
