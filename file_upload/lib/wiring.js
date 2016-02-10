'use strict';

var express = require('express'),
    responses = require('./responses'),
    s3 = require('s3'),
    multer  = require('multer'),
	multerDef = require('./multerDef');

module.exports = initApp;

function initApp(opts) {
	var app = express(),
	    router = express.Router();

	//multer middleware for parsing multipart form data
	app.use(multer(multerDef));

    //require routes
    opts.apiVersions.forEach(function(version) {
        var path = __dirname + '/../app/routes/' + version;
        require(path + '/' + 'image.js')(app, router, version); //api path for image handling
        require(path + '/' + 'index.js')(app, router);  //not an api path - just the GUI for uploading
    });

	router.use(responses.endRequest);
	app.use('/', router);
	return app;
}