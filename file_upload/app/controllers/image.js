'use strict';

var s3 = require('s3'),
config = require('../config'),
responses = require('../../lib/responses.js'),
client = s3.createClient(config.s3ClientParams),
bucket = config.uploadParams.bucket;

/*
 * Get a list of all the images currently on S3
 */
exports.index = function(req, res, next) {

  var listConf = {
    s3Params: {
      Bucket: config.uploadParams.bucket,
      EncodingType: 'url'
    },
    recursive: true
  };
  var s3Lister = client.listObjects(listConf);
  var files = [];

  s3Lister.on('error', function(err) {
    console.error("Unable to upload:", err.stack);
    responses.internalServerError(err, req, res, next);
  });

  s3Lister.on('data', function(data) {
    var objects = data.Contents;
    for (var i = 0; i < objects.length; i++) {
      files.push(s3.getPublicUrlHttp(bucket, objects[i].Key));
    }    
  });

  s3Lister.on('end', function() {
    console.log("Success.");
    //var url = s3.getPublicUrlHttp(bucket, key);
    res.results = [
        {
            "msg": "Listing operation complete",
            "bucket": bucket,
            "files": files
        }
    ];
    next();
  });
};

/*
 * Upload to local dir, then upload to post body.  @todo No auth yet. 
 */
exports.upload = function(req, res, next) {
  console.log("Beginning s3 upload...");
  var progress = 0,
  key = req.files.image.originalname;

  var uploadConf = {
    localFile: req.files.image.path,
    s3Params: {
      Bucket: bucket,
      Key: key,
      ACL: "public-read",
      ContentType: req.files.image.mimetype //@todo handling limits like file size etc.
      }
  };

  var s3uploader = client.uploadFile(uploadConf); //upload to S3

  s3uploader.on('error', function(err) {
    console.error("Unable to upload:", err.stack);
    responses.internalServerError(err, req, res, next);
  });

  s3uploader.on('progress', function() {
    console.log("progress: " + progress + "%");
    progress = parseInt((s3uploader.progressAmount / s3uploader.progressTotal) * 100);
  });

  s3uploader.on('end', function() {
    console.log("Success.");
    var url = s3.getPublicUrlHttp(bucket, key);
    res.results = [
        {
            "msg": "File uploaded to S3.",
            "url": url
        }
    ];
    next();
  });
};

/*
 * Delete an image with a specific filename off s3. 
 * @todo 
 */
exports.remove = function(req, res, next) {
    res.results = [
        {
            foo: "todo",
        }
    ];

    next();

};