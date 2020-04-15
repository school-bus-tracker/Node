const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const authSuperUser = require('../middleware/authsuperusers');
const {SuperUser,validate} = require('../models/superusers');

const router = express.Router();

router.get("/me",authSuperUser, async (req,res)=>{
        const superUser = await SuperUser.findById(req.superUser._id).select('-Password');
        res.send(superUser);
});

router.get("/",authSuperUser, async (req,res)=>{
        const superUser = await SuperUser.find().select('-Password');
        res.send(superUser);
});

router.post("/",authSuperUser, async (req,res)=>{
        const {error} = validate(req.body);

        if(error) return res.status(400).send(error.details[0].message);

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.Password,salt);

        const superUser = new SuperUser({
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: password,
            MobileNumber: req.body.MobileNumber
        });

        const result = await superUser.save();

        res.send(_.omit(result,['Password']));
});

router.get('/:id',authSuperUser, async (req,res)=>{
        const superUser = await SuperUser.findById(req.params.id);

        if(!superUser) return res.status(400).send('No SuperUser were found with the given id');
    
        res.send(_.omit(superUser,['Password']));
});

router.put('/:id',authSuperUser, async (req,res)=>{
        const {error} = validate(req.body);
    
        if(error) return res.status(400).send(error.details[0].message);

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.Password,salt);
    
        const superUser = await SuperUser.findByIdAndUpdate(req.params.id,{
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: password,
            MobileNumber: req.body.MobileNumber
        },
        {
            new:true
        });
    
        if(!superUser) return res.status(400).send('No SuperUser were found with the given id');
    
        res.send(_.omit(superUser,['Password']));
    
});

module.exports = router;