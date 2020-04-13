const express = require('express');
const mongoose = require('mongoose');
const {Location,validate} = require('../models/locations');

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const location = await Location.find();
        res.send(location);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.BusID)) return res.status(400).send("Invalid Bus Id");

        if(error) return res.status(400).send(error.details[0].message);

        const location = new Location({
            StopName : req.body.StopName,
            Latitude : req.body.Latitude, 
            Longitude : req.body.Longitude ,
            BusID :  req.body.BusID  
        });

        const result = await location.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const location = await Location.findById(req.params.id);

        if(!location) return res.status(400).send('No Location were found with the given id');
    
        res.send(location);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.BusID)) return res.status(400).send("Invalid Bus Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const location = await Location.findByIdAndUpdate(req.params.id,{
            StopName : req.body.StopName,
            Latitude : req.body.Latitude, 
            Longitude : req.body.Longitude ,
            BusID :  req.body.BusID  
        },
        {
            new:true
        });
    
        if(!location) return res.status(400).send('No Location were found with the given id');
    
        res.send(location);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

module.exports = router;