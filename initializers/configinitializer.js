const config = require('config');

module.exports = function(){    
    if(!config.get('privateKey')){
        throw new Error('FATAL ERROR-> privateKey has not been set');
    }
    if(!config.get('superUserPassword')){
        throw new Error('FATAL ERROR-> superUserPassword has not been set');
    }

}