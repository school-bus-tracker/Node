const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const superusers = [{
    Id:1,
    EmailID: "rishi@gmail.com",
    FirstName: "rishivikram",
    LastName: "nandakumar",
    Password: "rishivikram",
    MobileNumber: "9791804850"
    }
]

router.get("/",(req,res)=>{
    
    res.send(superusers);
});

router.post("/",(req,res)=>{
    const {error} = validateSuperUser(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const superuser = superusers.find(p=>p.Id == parseInt(req.params.id));

    if(!superuser) return res.status(400).send('no superuser were found with the given id');

    res.send(superuser);
});

router.put('/:id',(req,res)=>{
    const {error} = validateSuperUser(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const superuser = superusers.find(p=>p.Id == parseInt(req.params.id));

    if(!superuser) return res.status(400).send('no superuser were found with the given id');

    superuser.Id = req.body.id
    superuser.EmailID= req.body.EmailID
    superuser.FirstName= req.body.FirstName
    superuser.LastName= req.body.LastName
    superuser.Password= req.body.Password
    superuser.MobileNumber= req.body.MobileNumber

    res.send(superuser);
});

function validateSuperUser(superuser){
    const schema = Joi.object({
        EmailID: Joi.string().trim().email().required(),
        FirstName: Joi.string().trim().min(5).max(60).required(),
        LastName: Joi.string().trim().min(5).max(60).required(),
        Password: Joi.string().trim().min(8).max(32).alphanum().required(),
        MobileNumber: Joi.string().trim().regex(/^[0-9]{10}$/).required()
    });

    return schema.validate(superuser);
}

module.exports = router;