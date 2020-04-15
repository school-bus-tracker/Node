const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');
const config = require('config');

module.exports = function(){
    winston.add(new winston.transports.File({ filename:'logfile.log', level: 'error' }));
    winston.add(new winston.transports.MongoDB({ db: config.get('db'), options:{ useUnifiedTopology: true },level: 'error'}));
    winston.add(new winston.transports.Console({format: winston.format.simple(), level: 'info'}));

    winston.exceptions.handle(
            new winston.transports.File({ filename:'uncaughtexceptions.log' }),
           new winston.transports.Console({format: winston.format.simple(), level: 'error'})
    );

    process.on('unhandledRejection',(ex)=>{
            console.log(ex);
            throw ex;
    });
}