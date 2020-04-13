const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const BusRoute = mongoose.model("BusRoutes",new mongoose.Schema({
    BusID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Buses',
        required:true
    },
    LocationID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Locations',
        required:true
    },
    SchoolID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Schools',
        required:true
    }

}));


function validateBusRoute(busRoute){
    const schema = Joi.object({
        BusID: Joi.string().trim().required(),
        LocationID: Joi.string().trim().required(),
        SchoolID: Joi.string().trim().required()
    });

    return schema.validate(busRoute);
}

module.exports.BusRoute = BusRoute;
module.exports.validate = validateBusRoute;