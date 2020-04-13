const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Bus = mongoose.model("Buses",new mongoose.Schema({
    BusName:{
        type:String,
        minlength:5,
        maxlength:60,
        required:true
    },
    SchoolID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Schools',
        required:true
    }

}));


function validateBus(bus){
    const schema = Joi.object({
        BusName: Joi.string().trim().min(5).max(60).required(),
        SchoolID: Joi.string().trim().required()
    });

    return schema.validate(bus);
}

module.exports.Bus = Bus;
module.exports.validate = validateBus;