const express = require('express');
const mongoose = require('mongoose');
const {Parent,validate} = require('../models/parents');

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const parent = await Parent.find();
        res.send(parent);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",async(req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolAdminID)) return res.status(400).send("Invalid School Admin Id");

        if(error) return res.status(400).send(error.details[0].message);

        const parent = new Parent({
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolAdminID : req.body.SchoolAdminID
        });

        const result = await parent.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
    
});

router.get('/:id',async(req,res)=>{
    try{
        const parent = await Parent.findById(req.params.id);

        if(!parent) return res.status(400).send('No Parent were found with the given id');
    
        res.send(parent);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolAdminID)) return res.status(400).send("Invalid School Admin Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const parent = await Parent.findByIdAndUpdate(req.params.id,{
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolAdminID : req.body.AdminID
        },
        {
            new:true
        });
    
        if(!parent) return res.status(400).send('No Parent were found with the given id');
    
        res.send(parent);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
    
});


module.exports = router;