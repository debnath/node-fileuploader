'use strict';

/*
 * Route for the index page for uploading files (html not json)
 */
var indexController = require('../../controllers/index');

module.exports = function (app, router) {
    router.route('/')
        .all(indexController.index);

    app.use('/', router);
};
