const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const locations = [{
    Id :1,
    StopName : "aaa",
    Longitude : 150, 
    Latitude :   80,
    BusID :  1
    }
]

router.get("/",(req,res)=>{
    
    res.send(locations);
});

router.post("/",(req,res)=>{
    const {error} = validateLocation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const location = locations.find(p=>p.Id == parseInt(req.params.id));

    if(!location) return res.status(400).send('no location were found with the given id');

    res.send(location);
});

router.put('/:id',(req,res)=>{
    const {error} = validateLocation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const location = locations.find(p=>p.Id == parseInt(req.params.id));

    if(!location) return res.status(400).send('no location were found with the given id');

    location.Id = req.body.Id
    location.StopName= req.body.StopName
    location.Longitude= req.body.Longitude
    location.Latitude= req.body.Latitude
    location.BusID = req.body.BusID

    res.send(location);
});

function validateLocation(location){
    const schema = Joi.object({
        StopName: Joi.string().trim().min(5).max(60).required(),
        Longitude: Joi.number().min(-180).max(180).required(),
        Latitude: Joi.number().min(-90).max(90).required()
    });

    return schema.validate(location);
}

module.exports = router;