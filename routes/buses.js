const express = require('express');
const mongoose = require('mongoose');
const {Bus,validate} = require('../models/buses');

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const bus = await Bus.find();
        res.send(bus);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
        
        if(error) return res.status(400).send(error.details[0].message);

        const bus = new Bus({
            BusName : req.body.BusName,
            SchoolID :  req.body.SchoolID  
        });

        const result = await bus.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const bus = await Bus.findById(req.params.id);

        if(!bus) return res.status(400).send('No Bus were found with the given id');
    
        res.send(bus);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const bus = await Bus.findByIdAndUpdate(req.params.id,{
            BusName : req.body.BusName,
            SchoolID :  req.body.SchoolID  
        },
        {
            new:true
        });
    
        if(!bus) return res.status(400).send('No Bus were found with the given id');
    
        res.send(bus);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

module.exports = router;