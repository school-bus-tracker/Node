const express = require('express');
const mongoose = require('mongoose');
const {School,validate} = require('../models/schools');

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const school = await School.find();
        res.send(school);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SuperUserID)) return res.status(400).send("Invalid Super User Id");

        if(error) return res.status(400).send(error.details[0].message);

        const school = new School({
            Name: req.body.Name,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            EmailID: req.body.EmailID,
            SuperUserID : req.body.SuperUserID,
        });

        const result = await school.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const school = await School.findById(req.params.id);

        if(!school) return res.status(400).send('No School were found with the given id');
    
        res.send(school);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SuperUserID)) return res.status(400).send("Invalid Super User Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const school = await School.findByIdAndUpdate(req.params.id,{
            Name: req.body.Name,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            EmailID: req.body.EmailID,
            SuperUserID : req.body.SuperUserID,
        },
        {
            new:true
        });
    
        if(!school) return res.status(400).send('No School were found with the given id');
    
        res.send(school);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

module.exports = router;