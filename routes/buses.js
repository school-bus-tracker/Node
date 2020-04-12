const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const buses = [{
    Id :1,
    BusName: "A",
    SchoolID :  1
    }
]

router.get("/",(req,res)=>{
    
    res.send(buses);
});

router.post("/",(req,res)=>{
    const {error} = validateBus(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const bus = buses.find(p=>p.Id == parseInt(req.params.id));

    if(!bus) return res.status(400).send('no bus were found with the given id');

    res.send(bus);
});

router.put('/:id',(req,res)=>{
    const {error} = validateBus(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const bus = buses.find(p=>p.Id == parseInt(req.params.id));

    if(!bus) return res.status(400).send('no bus were found with the given id');

    bus.Id = req.body.Id
    bus.BusName= req.body.BusName
    bus.SchoolID = req.body.SchoolID

    res.send(bus);
});

function validateBus(bus){
    const schema = Joi.object({
        BusName: Joi.string().trim().min(5).max(60).required()
    });

    return schema.validate(bus);
}


module.exports = router;