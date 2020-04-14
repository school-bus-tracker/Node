const {SuperUser,validate} = require('../models/superusers');
const config = require('config');
const bcrypt = require('bcrypt');

module.exports = async ()=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(config.get('superUserPassword'),salt);

        const superUser = new SuperUser({
            EmailID: 'superuser@gmail.com',
            FirstName: 'superuser',
            LastName: 'untitled',
            Password: password,
            MobileNumber: '9791804850',
        });
        
        await superUser.save();
    }
    catch(ex){
        console.error(ex);
        process.exit(1);
    }
}