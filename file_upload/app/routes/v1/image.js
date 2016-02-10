'use strict';

/**
 * Routes for the JSON api with the options to view, upload and delete images off S3. 
 */

var imageController = require('../../controllers/image');

module.exports = function (app, router, version) {
    router.route('/images')
        .get(imageController.index) 
        .post(imageController.upload);

    router.route('/images/:id')
        .delete(imageController.remove);  //@todo - "delete by filename "operation not yet implemented

    app.use('/' + version, router);
};