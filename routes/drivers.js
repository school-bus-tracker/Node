const express = require('express');
const mongoose = require('mongoose');
const {Driver,validate} = require('../models/drivers');

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const driver = await Driver.find();
        res.send(driver);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolAdminID)) return res.status(400).send("Invalid School Admin Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.BusID)) return res.status(400).send("Invalid Bus Id");

        if(error) return res.status(400).send(error.details[0].message);

        const driver = new Driver({
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolAdminID : req.body.SchoolAdminID,
            SchoolID: req.body.SchoolID,
            BusID: req.body.BusID
        });

        const result = await driver.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
    
});

router.get('/:id',async (req,res)=>{
    try{
        const driver = await Driver.findById(req.params.id);

        if(!driver) return res.status(400).send('No Driver were found with the given id');
    
        res.send(driver);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolAdminID)) return res.status(400).send("Invalid School Admin Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.BusID)) return res.status(400).send("Invalid Bus Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const driver = await Driver.findByIdAndUpdate(req.params.id,{
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolAdminID : req.body.AdminID,
            SchoolID: req.body.SchoolID,
            BusID: req.body.BusID
        },
        {
            new:true
        });
    
        if(!driver) return res.status(400).send('No Driver were found with the given id');
    
        res.send(driver);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

module.exports = router;