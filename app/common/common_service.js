const Common = (function () {
    'use strict'
    const serverConfig = require('./server_config')
    
    function Common () {}
    
    let instance;

    Common.prototype = {
        getServer: function (type) {
            return type === 'signal' ? serverConfig.signalServer[ Math.floor(Math.random() * 3) ]
                                     : serverConfig.coreServer[0]
        }
    }

    return {
        getInstance: function () {
            if ( typeof instance === 'undefined' ) {
                instance = new Common();
            }
            return instance;
        }
    }
})();



module.exports = Common;

