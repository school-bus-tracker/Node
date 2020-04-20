const express = require("express");
const mongoose = require("mongoose");
const authParent = require("../middleware/authparents");
const authDriver = require("../middleware/authdrivers");
const authSchoolAdmin = require("../middleware/authschooladmins");
const authSuperUser = require("../middleware/authsuperusers");
const { Bus, validate } = require("../models/buses");

const router = express.Router();

router.get("/", [authParent], async (req, res) => {
  const bus = await Bus.find();
  res.send(bus);
});

router.post("/", [authSchoolAdmin], async (req, res) => {
  const { error } = validate(req.body);

  if (!mongoose.Types.ObjectId.isValid(req.body.SchoolID))
    return res.status(400).send("Invalid School Id");

  if (error) return res.status(400).send(error.details[0].message);

  const bus = new Bus({
    BusName: req.body.BusName,
    SchoolID: req.body.SchoolID,
  });

  const result = await bus.save();

  res.send(result);
});

router.get("/:id", [authParent], async (req, res) => {
  const bus = await Bus.findById(req.params.id);

  if (!bus) return res.status(400).send("No Bus were found with the given id");

  res.send(bus);
});

router.put("/:id", [authSchoolAdmin], async (req, res) => {
  const { error } = validate(req.body);

  if (!mongoose.Types.ObjectId.isValid(req.body.SchoolID))
    return res.status(400).send("Invalid School Id");

  if (error) return res.status(400).send(error.details[0].message);

  const bus = await Bus.findByIdAndUpdate(
    req.params.id,
    {
      BusName: req.body.BusName,
      SchoolID: req.body.SchoolID,
    },
    {
      new: true,
    }
  );

  if (!bus) return res.status(400).send("No Bus were found with the given id");

  res.send(bus);
});

module.exports = router;
