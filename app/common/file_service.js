const Upload = (function () {
    'use strict'

    const fs = require('fs');

    const serverConfig = require('./server_config');
    
    function Upload () {}
    
    let instance;

    Upload.prototype = {
        isFileEixist: function (pdf) {
            try {
                return fs.statSync(pdf).isUpload();
            } catch(e) {
                return false;
            }
        },

        isDirEixist: function (dir) {
            
            return new Promise(function (resolve, rejet) {
                    if (fs.statSync(dir).isDirectory()) {
                        resolve('exist')
                    } else {
                        reject('no exist')
                    }
            })
        }
            
    }
    return {
        getInstance: function () {
            if ( typeof instance === 'undefined' ) {
                instance = new Upload();
            }
            return instance;
        }
    }
})();



module.exports = Upload;

