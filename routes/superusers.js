const express = require('express');
const mongoose = require('mongoose');
const {SuperUser,validate} = require('../models/superusers');

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const superUser = await SuperUser.find();
        res.send(superUser);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(error) return res.status(400).send(error.details[0].message);

        const superUser = new SuperUser({
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            MobileNumber: req.body.MobileNumber
        });

        const result = await superUser.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const superUser = await SuperUser.findById(req.params.id);

        if(!superUser) return res.status(400).send('No SuperUser were found with the given id');
    
        res.send(superUser);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const {error} = validate(req.body);
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const superUser = await SuperUser.findByIdAndUpdate(req.params.id,{
            EmailID: req.body.EmailID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password,
            MobileNumber: req.body.MobileNumber
        },
        {
            new:true
        });
    
        if(!superUser) return res.status(400).send('No SuperUser were found with the given id');
    
        res.send(superUser);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
    
});

module.exports = router;