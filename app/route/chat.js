const express = require('express'),
      common = require('../common/common_service'),
      router = express.Router();
      

router.get('/', function ( req, res) {

    let commonService = common.getInstance();
    console.log()
    res.render('chat', {
        title: 'Parkoon KT Prototype',
        signal: `http://localhost:${ commonService.getServer('signal') }`,
        core: `http://localhost:${ commonService.getServer('core') }` 
    });
});

module.exports = router;