const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const authDriver = require('../middleware/authdrivers');
const authParent = require('../middleware/authparents');
const authSchoolAdmin = require('../middleware/authschooladmins');
const authSuperUser = require('../middleware/authsuperusers');
const {SchoolAdmin,validate} = require('../models/schooladmins');

const router = express.Router();


router.get("/me",authSchoolAdmin, async (req,res)=>{
        const schoolAdmin = await SchoolAdmin.findById(req.schoolAdmin._id).select('-Password');
        res.send(schoolAdmin);
});

router.get("/",[authParent,authDriver,authSchoolAdmin,authSuperUser], async (req,res)=>{
        const schoolAdmin = await SchoolAdmin.find().select('-Password');
        res.send(schoolAdmin);
});

router.post("/",authSuperUser, async (req,res)=>{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");

        if(!mongoose.Types.ObjectId.isValid(req.body.SuperUserID)) return res.status(400).send("Invalid Super User Id");

        if(error) return res.status(400).send(error.details[0].message);

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.Password,salt);

        const schoolAdmin = new SchoolAdmin({
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: password,
            MobileNumber: req.body.MobileNumber,
            Address: req.body.Address,
            IsActive: req.body.IsActive,
            SchoolID: req.body.SchoolID,
            SuperUserID: req.body.SuperUserID
        });

        const result = await schoolAdmin.save();

        res.send(_.omit(result,['Password']));
});

router.get('/:id',[authParent,authDriver,authSchoolAdmin,authSuperUser], async (req,res)=>{
        const schoolAdmin = await SchoolAdmin.findById(req.params.id);

        if(!schoolAdmin) return res.status(400).send('No SchoolAdmin were found with the given id');
    
        res.send(_.omit(schoolAdmin,['Password']));
});

router.put('/:id',authSuperUser, async (req,res)=>{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");

        if(!mongoose.Types.ObjectId.isValid(req.body.SuperUserID)) return res.status(400).send("Invalid Super User Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.Password,salt);

        const schoolAdmin = await SchoolAdmin.findByIdAndUpdate(req.params.id,{
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: password,
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
    
        res.send(_.omit(schoolAdmin,['Password']));
});

module.exports = router;