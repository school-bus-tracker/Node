const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const {Parent} = require('../models/parents');

const router = express.Router();


router.post("/",async(req,res)=>{
    try{
        const {error} = validate(req.body);

        if(error) return res.status(400).send(error.details[0].message);

        const parent = await Parent.findOne({ EmailID: req.body.EmailID });
        if(!parent) return res.status(400).send('Invalid Email or Password');

        const validPassword = await bcrypt.compare(req.body.Password,parent.Password);
        if(!validPassword) return res.status(400).send('Invalid Email or Password');

        const token = parent.generateAuthToken();
        res.send(token);
    }
    catch(ex){
        res.status(500).send(ex.message);
    }
    
});

function validate(parent){
    const schema = Joi.object(
        {
            EmailID: Joi.string().trim().max(30).email().required(),
            Password: Joi.string().trim().min(8).max(32).alphanum().required()
        }
    );
    
    return schema.validate(parent);
}


module.exports = router;