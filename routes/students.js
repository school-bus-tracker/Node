const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const students = [{
    Id:1,
    RollNumber: "1505042",
    FirstName: "rishivikram",
    LastName: "nandakumar",
    Class: "tenth",
    SchoolID:1,
    LocationID:1,
    BusID:1,
    ParentID:1
    }
]

router.get("/",(req,res)=>{
    
    res.send(students);
});

router.post("/",(req,res)=>{
    const {error} = validateStudent(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    res.send(req.body);
});

router.get('/:id',(req,res)=>{
    const student = students.find(p=>p.Id == parseInt(req.params.id));

    if(!student) return res.status(400).send('no student were found with the given id');

    res.send(student);
});

router.put('/:id',(req,res)=>{
    const {error} = validateStudent(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const student = students.find(p=>p.Id == parseInt(req.params.id));

    if(!student) return res.status(400).send('no student were found with the given id');

    student.Id = req.body.Id
    student.RollNumber= req.body.RollNumber
    student.FirstName= req.body.FirstName
    student.LastName= req.body.LastName
    student.Class = req.body.Class
    student.SchoolID = req.body.SchoolID
    student.LocationID = req.body.LocationID
    student.BusID = req.body.BusID
    student.ParentID = req.body.ParentID

    res.send(student);
});

function validateStudent(student){
    const schema = Joi.object({
        RollNumber: Joi.string().trim().required(),
        FirstName: Joi.string().trim().min(5).max(60).required(),
        LastName: Joi.string().trim().min(5).max(60).required(),
        Class:Joi.string().trim().required()
    });

    return schema.validate(student);
}
module.exports = router;