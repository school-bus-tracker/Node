const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Location = mongoose.model("Locations",new mongoose.Schema({
    StopName:{
        type:String,
        minlength:5,
        maxlength:60,
        required:true
    },
    Latitude:{
        type:Number,
        min:-90,
        max:90,
        required:true
    },
    Longitude:{
        type:Number,
        min:-180,
        max:180,
        required:true
    },
    BusID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Buses',
        required:true
    }

}));


function validateLocation(location){
    const schema = Joi.object({
        StopName: Joi.string().trim().min(5).max(60).required(),
        Latitude: Joi.number().min(-90).max(90).required(),
        Longitude: Joi.number().min(-180).max(180).required(),
        BusID: Joi.string().trim().required()
    });

    return schema.validate(location);
}

module.exports.Location = Location;
module.exports.validate = validateLocation;