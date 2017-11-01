const express = require('express');
      path = require('path'); 
      serverConfig = require('../common/server_config');

const router = express.Router();


router.get('/', function ( req, res ) {
    res.render('index', {
        title: 'Parkoon KT Prototype',
        signal: `http://localhost:${ getServer('signal') }`,
        core: `http://localhost:${ getServer('core') }` 
    });
});

const getServer = function (type) {
    return type === 'signal' ? serverConfig.signalServer[ Math.floor(Math.random() * 3) ]
                             : serverConfig.coreServer[0]
}

module.exports = router;