const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const DailyAttendance = mongoose.model("DailyAttendances",new mongoose.Schema({
    Date:{
        type:Date,
        default: Date.now()
    },
    Session:{
        type:String,
        enum: ['Morning','Evening'],
        required:true
    },
    Status:{
        type:String,
        enum:['Present','Absent'],
        required:true
    },
    SchoolID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Schools',
        required:true
    },
    StudentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Students',
        required:true
    },
    DriverID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Drivers',
        required:true
    }

}));


function validateDailyAttendance(dailyAttendance){
    const schema = Joi.object({
        Session: Joi.string().required(),
        Status: Joi.string().required(),
        SchoolID: Joi.string().trim().required(),
        StudentID: Joi.string().trim().required(),
        DriverID: Joi.string().trim().required()
    });

    return schema.validate(dailyAttendance);
}

module.exports.DailyAttendance = DailyAttendance;
module.exports.validate = validateDailyAttendance;