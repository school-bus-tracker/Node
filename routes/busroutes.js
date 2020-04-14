const express = require('express');
const mongoose = require('mongoose');
const authParent = require('../middleware/authparents');
const authDriver = require('../middleware/authdrivers');
const authSchoolAdmin = require('../middleware/authschooladmins');
const authSuperUser = require('../middleware/authsuperusers');
const {BusRoute,validate} = require('../models/busroutes');

const router = express.Router();

router.get("/",[authParent,authDriver,authSchoolAdmin,authSuperUser],async (req,res)=>{
    try{
        const busRoute = await BusRoute.find();
        res.send(busRoute);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.post("/",[authSchoolAdmin,authSuperUser],async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.BusID)) return res.status(400).send("Invalid Bus Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.LocationID)) return res.status(400).send("Invalid Location Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
        
        if(error) return res.status(400).send(error.details[0].message);

        const busRoute = new BusRoute({
            BusID :  req.body.BusID,  
            LocationID :  req.body.LocationID,  
            SchoolID :  req.body.SchoolID  
        });

        const result = await busRoute.save();

        res.send(result);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.get('/:id',[authParent,authDriver,authSchoolAdmin,authSuperUser],async (req,res)=>{
    try{
        const busRoute = await BusRoute.findById(req.params.id);

        if(!busRoute) return res.status(400).send('No Bus Route were found with the given id');
    
        res.send(busRoute);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

router.put('/:id',[authSchoolAdmin,authSuperUser],async (req,res)=>{
    try{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.BusID)) return res.status(400).send("Invalid Bus Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.LocationID)) return res.status(400).send("Invalid Location Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const busRoute = await BusRoute.findByIdAndUpdate(req.params.id,{
            BusID :  req.body.BusID,  
            LocationID :  req.body.LocationID,  
            SchoolID :  req.body.SchoolID
        },
        {
            new:true
        });
    
        if(!busRoute) return res.status(400).send('No Bus Route were found with the given id');
    
        res.send(busRoute);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
});

module.exports = router;