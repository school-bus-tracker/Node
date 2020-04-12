const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const schooladmins = [{
    Id:1,
    EmailID: "rishi@gmail.com",
    FirstName: "rishivikram",
    LastName: "nandakumar",
    Password: "rishivikram",
    MobileNumber: "9791804850",
    Address: "bangalore karnataka",
    IsActive: "true",
    SchoolID:1,
    SuperUserID:1
    }
]

router.get("/",(req,res)=>{
    
    res.send(schooladmins);
});

router.post("/",(req,res)=>{
    const {error} = validateSchoolAdmin(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const schooladmin = schooladmins.find(p=>p.Id == parseInt(req.params.id));

    if(!schooladmin) return res.status(400).send('no schooladmin were found with the given id');

    res.send(schooladmin);
});

router.put('/:id',(req,res)=>{
    const {error} = validateSchoolAdmin(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const schooladmin = schooladmins.find(p=>p.Id == parseInt(req.params.id));

    if(!schooladmin) return res.status(400).send('no schooladmin were found with the given id');

    schooladmin.Id = req.body.id
    schooladmin.EmailID= req.body.EmailID
    schooladmin.FirstName= req.body.FirstName
    schooladmin.LastName= req.body.LastName
    schooladmin.Password= req.body.Password
    schooladmin.MobileNumber= req.body.MobileNumber
    schooladmin.Address= req.body.Address
    schooladmin.IsActive= req.body.IsActive
    schooladmin.AdminID = req.body.AdminID

    res.send(schooladmin);
});

function validateSchoolAdmin(schooladmin){
    const schema = Joi.object({
        EmailID: Joi.string().trim().email().required(),
        FirstName: Joi.string().trim().min(5).max(60).required(),
        LastName: Joi.string().trim().min(5).max(60).required(),
        Password: Joi.string().trim().min(8).max(32).alphanum().required(),
        MobileNumber: Joi.string().trim().regex(/^[0-9]{10}$/).required(),
        Address: Joi.string().trim().min(10).max(300).required(),
        IsActive: Joi.bool().required()
    });

    return schema.validate(schooladmin);
}


module.exports = router;