const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const SuperUser = mongoose.model("SuperUsers",new mongoose.Schema({
    EmailID:{
        type:String,
        maxlength:30,
        required:true,
        trim:true,
        unique:true,
        index:true
    },
    FirstName:{
        type:String,
        minlength:5,
        maxlength:60,
        required:true
    },
    LastName:{
        type:String,
        minlength:5,
        maxlength:60,
        required:true
    },
    Password:{
        type:String,
        minlength:8,
        maxlength:32,
        required:true
    },
    MobileNumber:{
        type:String,
        match:/^[0-9]{10}$/,
        required:true
    }
}));


function validateSuperUser(superuser){
    const schema = Joi.object({
        EmailID: Joi.string().trim().max(30).email().required(),
        FirstName: Joi.string().trim().min(5).max(60).required(),
        LastName: Joi.string().trim().min(5).max(60).required(),
        Password: Joi.string().trim().min(8).max(32).alphanum().required(),
        MobileNumber: Joi.string().trim().regex(/^[0-9]{10}$/).required(),
    });

    return schema.validate(superuser);
    
}

module.exports.SuperUser = SuperUser;
module.exports.validate = validateSuperUser;