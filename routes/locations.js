const express = require('express');
const mongoose = require('mongoose');
const authParent = require('../middleware/authparents');
const authDriver = require('../middleware/authdrivers');
const authSchoolAdmin = require('../middleware/authschooladmins');
const authSuperUser = require('../middleware/authsuperusers');
const {Location,validate} = require('../models/locations');

const router = express.Router();

router.get("/",[authParent,authDriver,authSchoolAdmin,authSuperUser], async (req,res)=>{
        const location = await Location.find();
        res.send(location);
});

router.post("/",[authSchoolAdmin,authSuperUser], async (req,res)=>{
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
});

router.get('/:id',[authParent,authDriver,authSchoolAdmin,authSuperUser], async (req,res)=>{
        const location = await Location.findById(req.params.id);

        if(!location) return res.status(400).send('No Location were found with the given id');
    
        res.send(location);
});

router.put('/:id',[authSchoolAdmin,authSuperUser], async (req,res)=>{
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
});

module.exports = router;