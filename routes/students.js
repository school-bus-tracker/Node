const express = require('express');
const mongoose = require('mongoose');
const {Student,validate} = require('../models/students');

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const student = await Student.find();
        res.send(student);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.LocationID)) return res.status(400).send("Invalid Location Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.ParentID)) return res.status(400).send("Invalid Parent Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.BusID)) return res.status(400).send("Invalid Bus Id");

        if(error) return res.status(400).send(error.details[0].message);

        const student = new Student({
            RollNumber: req.body.RollNumber,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Class: req.body.Class,
            LocationID : req.body.LocationID,
            SchoolID: req.body.SchoolID,
            BusID: req.body.BusID,
            ParentID: req.body.ParentID
        });

        const result = await student.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const student = await Student.findById(req.params.id);

        if(!student) return res.status(400).send('No Student were found with the given id');
    
        res.send(student);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.LocationID)) return res.status(400).send("Invalid Location Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.ParentID)) return res.status(400).send("Invalid Parent Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.BusID)) return res.status(400).send("Invalid Bus Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const student = await Student.findByIdAndUpdate(req.params.id,{
            RollNumber: req.body.RollNumber,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Class: req.body.Class,
            LocationID : req.body.LocationID,
            SchoolID: req.body.SchoolID,
            BusID: req.body.BusID,
            ParentID: req.body.ParentID
        },
        {
            new:true,
            runValidators:true
        });
    
        if(!student) return res.status(400).send('No Student were found with the given id');
    
        res.send(student);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

module.exports = router;