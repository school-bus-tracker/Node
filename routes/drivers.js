const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const authParent = require("../middleware/authparents");
const authDriver = require("../middleware/authdrivers");
const authSchoolAdmin = require("../middleware/authschooladmins");
const authSuperUser = require("../middleware/authsuperusers");
const { Driver, validate } = require("../models/drivers");

const router = express.Router();

router.get("/me", authDriver, async (req, res) => {
  const driver = await Driver.findById(req.driver._id).select("-Password");
  res.send(driver);
});

router.get("/", [authParent], async (req, res) => {
  const driver = await Driver.find().select("-Password");
  res.send(driver);
});

router.post("/", [authSchoolAdmin], async (req, res) => {
  req.body.IsActive = true;
  const { error } = validate(req.body);

  if (!mongoose.Types.ObjectId.isValid(req.body.SchoolAdminID))
    return res.status(400).send("Invalid School Admin Id");
  if (!mongoose.Types.ObjectId.isValid(req.body.SchoolID))
    return res.status(400).send("Invalid School Id");
  if (!mongoose.Types.ObjectId.isValid(req.body.BusID))
    return res.status(400).send("Invalid Bus Id");

  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.Password, salt);

  const driver = new Driver({
    EmailID: req.body.EmailID,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Password: password,
    MobileNumber: req.body.MobileNumber,
    Address: req.body.Address,
    IsActive: req.body.IsActive,
    SchoolAdminID: req.body.SchoolAdminID,
    SchoolID: req.body.SchoolID,
    BusID: req.body.BusID,
  });

  const result = await driver.save();

  res.send(_.omit(result, ["Password"]));
});

router.get("/:id", [authParent], async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (!driver)
    return res.status(400).send("No Driver were found with the given id");

  res.send(_.omit(driver, ["Password"]));
});

router.put("/:id", [authSchoolAdmin], async (req, res) => {
  const { error } = validate(req.body);

  if (!mongoose.Types.ObjectId.isValid(req.body.SchoolAdminID))
    return res.status(400).send("Invalid School Admin Id");
  if (!mongoose.Types.ObjectId.isValid(req.body.SchoolID))
    return res.status(400).send("Invalid School Id");
  if (!mongoose.Types.ObjectId.isValid(req.body.BusID))
    return res.status(400).send("Invalid Bus Id");

  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.Password, salt);

  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    {
      EmailID: req.body.EmailID,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Password: password,
      MobileNumber: req.body.MobileNumber,
      Address: req.body.Address,
      IsActive: req.body.IsActive,
      SchoolAdminID: req.body.AdminID,
      SchoolID: req.body.SchoolID,
      BusID: req.body.BusID,
    },
    {
      new: true,
    }
  );

  if (!driver)
    return res.status(400).send("No Driver were found with the given id");

  res.send(_.omit(driver, ["Password"]));
});

module.exports = router;
