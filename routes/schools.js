const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const schools = [{
    Id :1,
    Name : "aaa",
    MobileNumber : "9791804850", 
    Address :   "aaa,bbb,ccc",
    Email_ID :  "rishi.vikram.1@gmail.com",
    SuperUSerID:1
    }
]

router.get("/",(req,res)=>{
    
    res.send(schools);
});

router.post("/",(req,res)=>{
    const {error} = validateSchool(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const school = schools.find(p=>p.Id == parseInt(req.params.id));

    if(!school) return res.status(400).send('no school were found with the given id');

    res.send(school);
});

router.put('/:id',(req,res)=>{
    const {error} = validateSchool(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const school = schools.find(p=>p.Id == parseInt(req.params.id));

    if(!school) return res.status(400).send('no school were found with the given id');

    school.Id = req.body.Id
    school.Name= req.body.Name
    school.MobileNumber= req.body.MobileNumber
    school.Address= req.body.Address
    school.Email_ID = req.body.Email_ID

    res.send(school);
});

function validateSchool(school){    
    const schema = Joi.object({
        Name: Joi.string().trim().min(5).max(60).required(),
        MobileNumber: Joi.string().trim().regex(/^[0-9]{10}$/).required(),
        Address: Joi.string().trim().min(10).max(300).required(),
        EmailID: Joi.string().trim().email().required()
    });

    return schema.validate(school);
}

module.exports = router;