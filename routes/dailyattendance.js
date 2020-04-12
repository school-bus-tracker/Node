const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const dailyAttendances = [{
    Id :1,
    Date : '01/01/2020',
    Session : 150, 
    Status :   80,
    SchoolID :  1,
    StudentID: 1,
    DriverID: 1
    }
]


router.get("/",(req,res)=>{
    
    res.send(dailyAttendances);
});

router.post("/",(req,res)=>{
    const {error} = validateDailyAttendance(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const dailyAttendance = dailyAttendances.find(p=>p.Id == parseInt(req.params.id));

    if(!dailyAttendance) return res.status(400).send('no dailyattendance were found with the given id');

    res.send(dailyAttendance);
});

router.put('/:id',(req,res)=>{
    const {error} = validateDailyAttendance(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const dailyAttendance = dailyAttendances.find(p=>p.Id == parseInt(req.params.id));

    if(!dailyAttendance) return res.status(400).send('no dailyattendance were found with the given id');

    dailyAttendance.Id = req.body.Id
    dailyAttendance.StopName= req.body.StopName
    dailyAttendance.Longitude= req.body.Longitude
    dailyAttendance.Latitude= req.body.Latitude
    dailyAttendance.BusID = req.body.BusID

    res.send(dailyAttendance);
});

function validateDailyAttendance(dailyAttendance){
    const schema = Joi.object({
        Date: Joi.date().required(),
        Longitude: Joi.number().min(-180).max(180).required(),
        Latitude: Joi.number().min(-90).max(90).required()
    });

    return schema.validate(dailyAttendance);
}

module.exports = router;