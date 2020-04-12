const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const parents = [{
    Id:1,
    EmailID: "rishi@gmail.com",
    FirstName: "rishivikram",
    LastName: "nandakumar",
    Password: "rishivikram",
    MobileNumber: "9791804850",
    Address: "bangalore karnataka",
    IsActive: "true",
    AdminID:1
    }
]

router.get("/",(req,res)=>{
    
    res.send(parents);
});

router.post("/",(req,res)=>{
    const {error} = validateParent(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const parent = parents.find(p=>p.Id == parseInt(req.params.id));

    if(!parent) return res.status(400).send('no parent were found with the given id');

    res.send(parent);
});

router.put('/:id',(req,res)=>{
    const {error} = validateParent(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const parent = parents.find(p=>p.Id == parseInt(req.params.id));

    if(!parent) return res.status(400).send('no parent were found with the given id');

    parent.Id = req.body.id
    parent.EmailID= req.body.EmailID
    parent.FirstName= req.body.FirstName
    parent.LastName= req.body.LastName
    parent.Password= req.body.Password
    parent.MobileNumber= req.body.MobileNumber
    parent.Address= req.body.Address
    parent.IsActive= req.body.IsActive
    parent.AdminID = req.body.AdminID

    res.send(parent);
});

function validateParent(parent){
    const schema = Joi.object({
        EmailID: Joi.string().trim().email().required(),
        FirstName: Joi.string().trim().min(5).max(60).required(),
        LastName: Joi.string().trim().min(5).max(60).required(),
        Password: Joi.string().trim().min(8).max(32).alphanum().required(),
        MobileNumber: Joi.string().trim().regex(/^[0-9]{10}$/).required(),
        Address: Joi.string().trim().min(10).max(300).required(),
        IsActive: Joi.bool().required()
    });

    return schema.validate(parent);
    
}

module.exports = router;