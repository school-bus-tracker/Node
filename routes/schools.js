const express = require("express");
const mongoose = require("mongoose");
const authParent = require("../middleware/authparents");
const authDriver = require("../middleware/authdrivers");
const authSchoolAdmin = require("../middleware/authschooladmins");
const authSuperUser = require("../middleware/authsuperusers");
const { School, validate } = require("../models/schools");

const router = express.Router();

router.get("/", [authParent], async (req, res) => {
  const school = await School.find();
  res.send(school);
});

router.post("/", authSuperUser, async (req, res) => {
  const { error } = validate(req.body);

  if (!mongoose.Types.ObjectId.isValid(req.body.SuperUserID))
    return res.status(400).send("Invalid Super User Id");

  if (error) return res.status(400).send(error.details[0].message);

  const school = new School({
    Name: req.body.Name,
    MobileNumber: req.body.MobileNumber,
    Address: req.body.Address,
    EmailID: req.body.EmailID,
    IsActive: req.body.IsActive,
    SuperUserID: req.body.SuperUserID,
  });

  const result = await school.save();

  res.send(result);
});

router.get("/:id", [authParent], async (req, res) => {
  const school = await School.findById(req.params.id);

  if (!school)
    return res.status(400).send("No School were found with the given id");

  res.send(school);
});

router.put("/:id", authSuperUser, async (req, res) => {
  const { error } = validate(req.body);

  if (!mongoose.Types.ObjectId.isValid(req.body.SuperUserID))
    return res.status(400).send("Invalid Super User Id");

  if (error) return res.status(400).send(error.details[0].message);

  const school = await School.findByIdAndUpdate(
    req.params.id,
    {
      Name: req.body.Name,
      MobileNumber: req.body.MobileNumber,
      Address: req.body.Address,
      EmailID: req.body.EmailID,
      IsActive: req.body.IsActive,
      SuperUserID: req.body.SuperUserID,
    },
    {
      new: true,
    }
  );

  if (!school)
    return res.status(400).send("No School were found with the given id");

  res.send(school);
});

module.exports = router;
