const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const authParent = require('../middleware/authparents');
const authDriver = require('../middleware/authdrivers');
const authSchoolAdmin = require('../middleware/authschooladmins');
const authSuperUser = require('../middleware/authsuperusers');
const {Parent,validate} = require('../models/parents');

const router = express.Router();

router.get("/me",authParent,async (req,res)=>{
    try{
        const parent = await Parent.findById(req.parent._id).select('-Password');
        res.send(parent);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
   
});

router.get("/",[authParent,authDriver,authSchoolAdmin,authSuperUser],async (req,res)=>{
    try{
        const parent = await Parent.find().select('-Password');
        res.send(parent);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",[authSchoolAdmin,authSuperUser],async(req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolAdminID)) return res.status(400).send("Invalid School Admin Id");

        if(error) return res.status(400).send(error.details[0].message);

        
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.Password,salt);

        const parent = new Parent({
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolAdminID : req.body.SchoolAdminID
        });
        const result = await parent.save();

        res.send(_.omit(result,['Password']));
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
    
});

router.get('/:id',[authParent,authDriver,authSchoolAdmin,authSuperUser],async(req,res)=>{
    try{
        const parent = await Parent.findById(req.params.id);

        if(!parent) return res.status(400).send('No Parent were found with the given id');
    
        res.send(_.omit(parent,['Password']));
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',[authSchoolAdmin,authSuperUser],async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolAdminID)) return res.status(400).send("Invalid School Admin Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.Password,salt);

        const parent = await Parent.findByIdAndUpdate(req.params.id,{
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolAdminID : req.body.AdminID
        },
        {
            new:true
        });
    
        if(!parent) return res.status(400).send('No Parent were found with the given id');
    
        res.send(_.omit(parent,['Password']));
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
    
});


module.exports = router;