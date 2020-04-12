const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();

const busroutes = [{
    Id:1,
    BusID :1,
    LocationID: 1,
    SchoolID :  1
    }
]



router.get("/",(req,res)=>{
    
    res.send(busroutes);
});

router.post("/",(req,res)=>{
    const {error} = validateBusRoute(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const busroute = busroutes.find(p=>p.Id == parseInt(req.params.id));

    if(!busroute) return res.status(400).send('no busroute were found with the given id');

    res.send(busroute);
});

router.put('/:id',(req,res)=>{
    const {error} = validateBusRoute(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const busroute = busroutes.find(p=>p.Id == parseInt(req.params.id));

    if(!busroute) return res.status(400).send('no busroute were found with the given id');

    busroute.Id = req.body.Id
    busroute.busrouteName= req.body.busrouteName
    busroute.SchoolID = req.body.SchoolID

    res.send(busroute);
});

function validateBusRoute(busroute){
    const schema = Joi.object({
        busrouteName: Joi.string().trim().min(5).max(60).required()
    });

    return schema.validate(busroute);
}

module.exports = router;