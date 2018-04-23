var express = require('express');
var multer = require('multer');
var upload   =  multer( { dest: 'uploads/' } )
var router = express.Router();
var visualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new visualRecognitionV3({
    api_key: 'fb7504e782e66dcdecf702b282e8d4a503b7df1c',
    version: '2018-04-23'
});

var classifier_ids = ["fruits_1889404945"];

/* GET users listing. */
router.post('/', upload.single( 'file' ), function(req, res, next) {
  if ( !req.file.mimetype.startsWith( 'image/' ) ) {
    return res.status( 422 ).json( {
      error : 'The uploaded file must be an image'
    } );
  }

  var images_file = fs.createReadStream(req.file.path)

	var params = {
	    images_file: images_file,
	    classifier_ids: classifier_ids
	};

	visualRecognition.classify(params, function(err, response) {
    if (err)
        console.log(err);
    else
    	console.log(JSON.stringify(response, null, 2));
        res.end((JSON.stringify(response, null, 2)));
	});


  //return res.status( 200 ).send( req.file );
});

module.exports = router;
