const express = require('express');
const mongoose = require('mongoose');
const {SchoolAdmin,validate} = require('../models/schooladmins');

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const schoolAdmin = await SchoolAdmin.find();
        res.send(schoolAdmin);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");

        if(!mongoose.Types.ObjectId.isValid(req.body.SuperUserID)) return res.status(400).send("Invalid Super User Id");

        if(error) return res.status(400).send(error.details[0].message);

        const schoolAdmin = new SchoolAdmin({
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolID: req.body.SchoolID,
            SuperUserID: req.body.SuperUserID
        });

        const result = await schoolAdmin.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const schoolAdmin = await SchoolAdmin.findById(req.params.id);

        if(!schoolAdmin) return res.status(400).send('No SchoolAdmin were found with the given id');
    
        res.send(schoolAdmin);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");

        if(!mongoose.Types.ObjectId.isValid(req.body.SuperUserID)) return res.status(400).send("Invalid Super User Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const schoolAdmin = await SchoolAdmin.findByIdAndUpdate(req.params.id,{
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolID: req.body.SchoolID,
            SuperUserID: req.body.SuperUserID
        },
        {
            new:true
        });
    
        if(!schoolAdmin) return res.status(400).send('No School Admin were found with the given id');
    
        res.send(schoolAdmin);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

module.exports = router;