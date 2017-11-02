const express = require('express'),
      router = express.Router(),
      multiparty = require('multiparty'),
      fs = require('fs'),
      path =require('path'),
      file_service = require('../common/file_service'),
      common = require('../common/common_service');

router.post('/start', function (req, res) {
    
    let form = new multiparty.Form();
    let upload = file_service.getInstance(); 
        
    // file upload handling
    form.on('part',function (part) {
        
        console.log(part)

        let filename = part.filename || part.resume();
        let size = part.byteCount || part.resume();
        
        console.log('Write Streaming file :' + filename);

        
        upload.isDirEixist(path.join(__dirname, '../upload')).then(function (e) {
            // 폴더 존재.
        }).catch(function () {
            fs.mkdir('./upload', function (err) { console.log(err) });
            
        }).then(function () {

            let writeStream = fs.createWriteStream(path.join(__dirname, `../upload/${filename}`));
    
            writeStream.filename = filename;
            part.pipe(writeStream);
    
            part.on('data', function (chunk) {
                  //console.log(filename+' read '+chunk.length + 'bytes');
            });
    
            part.on('end', function () {
                  console.log(filename+' Part read complete');
                  writeStream.end();
            });
        })
    });

    // all uploads are completed
    form.on('close',function () {
        // 여기서 파일 변환이 이뤄져야 한다...
        res.status(200).send('Upload complete');

    });

   // track progress
   form.on('progress', function (byteRead,byteExpected) {

       // console.log(' Reading total  '+byteRead+'/'+byteExpected);

   });

   form.parse(req);
        

})

router.get('/', function (req, res) {

     let commonService = common.getInstance();

     res.render('upload', {
         title: 'Parkoon KT Upload Prototype',
         signal: `http://localhost:${ commonService.getServer('signal') }`,
         core: `http://localhost:${ commonService.getServer('core') }` 
     });
});

module.exports = router;