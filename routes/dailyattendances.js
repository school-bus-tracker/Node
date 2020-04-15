const express = require('express');
const mongoose = require('mongoose');
const authParent = require('../middleware/authparents');
const authDriver = require('../middleware/authdrivers');
const authSchoolAdmin = require('../middleware/authschooladmins');
const authSuperUser = require('../middleware/authsuperusers');
const {DailyAttendance,validate} = require('../models/dailyattendances');

const router = express.Router();

router.get("/",[authParent,authDriver,authSchoolAdmin,authSuperUser], async (req,res)=>{
        const dailyAttendance = await DailyAttendance.find();
        res.send(dailyAttendance);
});

router.post("/",[authDriver,authSchoolAdmin,authSuperUser], async (req,res)=>{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.DriverID)) return res.status(400).send("Invalid Driver Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.StudentID)) return res.status(400).send("Invalid Student Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
        
        if(error) return res.status(400).send(error.details[0].message);

        const dailyAttendance = new DailyAttendance({
            Session: req.body.Session,
            Status: req.body.Status,
            SchoolID :  req.body.SchoolID, 
            StudentID :  req.body.StudentID,  
            DriverID :  req.body.DriverID
        });

        const result = await dailyAttendance.save();

        res.send(result);
});

router.get('/:id',[authParent,authDriver,authSchoolAdmin,authSuperUser], async (req,res)=>{
        const dailyAttendance = await DailyAttendance.findById(req.params.id);

        if(!dailyAttendance) return res.status(400).send('No DailyAttendance were found with the given id');
    
        res.send(dailyAttendance);
});

router.put('/:id',[authDriver,authSchoolAdmin,authSuperUser], async (req,res)=>{
        const {error} = validate(req.body);

        if(!mongoose.Types.ObjectId.isValid(req.body.DriverID)) return res.status(400).send("Invalid Driver Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.StudentID)) return res.status(400).send("Invalid Student Id");
        if(!mongoose.Types.ObjectId.isValid(req.body.SchoolID)) return res.status(400).send("Invalid School Id");
    
        if(error) return res.status(400).send(error.details[0].message);
    
        const dailyAttendance = await DailyAttendance.findByIdAndUpdate(req.params.id,{
            Session: req.body.Session,
            Status: req.body.Status,
            SchoolID :  req.body.SchoolID, 
            StudentID :  req.body.StudentID,  
            DriverID :  req.body.DriverID
        },
        {
            new:true,
            runValidators:true
        });
    
        if(!dailyAttendance) return res.status(400).send('No Daily Attendance were found with the given id');
    
        res.send(dailyAttendance);
});

module.exports = router;