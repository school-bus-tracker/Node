const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const drivers = [{
    Id:1,
    EmailID: "rishi@gmail.com",
    FirstName: "rishivikram",
    LastName: "nandakumar",
    Password: "rishivikram",
    MobileNumber: "9791804850",
    Address: "bangalore karnataka",
    IsActive: "true",
    SchoolID:1,
    BusID:1,
    AdminID:1
    }
]

router.get("/",(req,res)=>{
    
    res.send(drivers);
});

router.post("/",(req,res)=>{
    const {error} = validateDriver(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const driver = drivers.find(p=>p.Id == parseInt(req.params.id));

    if(!driver) return res.status(400).send('no driver were found with the given id');

    res.send(driver);
});

router.put('/:id',(req,res)=>{
    const {error} = validateDriver(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const driver = drivers.find(p=>p.Id == parseInt(req.params.id));

    if(!driver) return res.status(400).send('no driver were found with the given id');

    driver.Id = req.body.Id
    driver.EmailID= req.body.EmailID
    driver.FirstName= req.body.FirstName
    driver.LastName= req.body.LastName
    driver.Password= req.body.Password
    driver.MobileNumber= req.body.MobileNumber
    driver.Address= req.body.Address
    driver.IsActive= req.body.IsActive
    driver.AdminID = req.body.AdminID
    driver.SchoolID = req.body.SchoolID
    driver.BusID = req.body.BusID

    res.send(driver);
});

function validateDriver(driver){
    const schema = Joi.object({
        EmailID: Joi.string().trim().email().required(),
        FirstName: Joi.string().trim().min(5).max(60).required(),
        LastName: Joi.string().trim().min(5).max(60).required(),
        Password: Joi.string().trim().min(8).max(32).alphanum().required(),
        MobileNumber: Joi.string().trim().regex(/^[0-9]{10}$/).required(),
        Address: Joi.string().trim().min(10).max(300).required(),
        IsActive: Joi.bool().required()
    });

    return schema.validate(driver);
}

module.exports = router;