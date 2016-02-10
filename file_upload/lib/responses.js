'use strict';

/**
 * Contains common responses (http 500 etc) as well as the generic template that responses will have. 
 */

var Responses = {

	/**
	 * At the end of each request, grab the status, results and any error and return to user. 
	 */
	endRequest: function endRequest(req, res) {

		var send = function send() {	
            res.status(res.statusCode).json({
                status: res.statusCode,
                error: res.error ? res.error.toString() : null,
                results: res.results || []
            });
		};

		if (typeof(req.route) === 'undefined') {
			Responses.notFound('Invalid route: ' + req.url, req, res, send);
		} else {
			send();
		}
	},

	/**
	 *  Call this when the user reaches a 400 Bad Request use case
	 */
	badRequest: function badRequest(err, req, res, next) {
		res.status(400);
		res.error = err;

		if (next) {
			next();
		} else {
			Responses.endRequest(req, res);
		}
	},

	/**
	 * Call this when the user reaches a 404 Not Found use case
	 */
	notFound: function notFound(err, req, res, next) {
		res.status(404);
		res.error = err;

		if (next) {
			next();
		} else {
			Responses.endRequest(req, res);
		}
	},

	/**
	 * Call this when the user reaches a 500 Internal Server Error use case
	 */
	internalServerError: function internalServerError(err, req, res, next) {
		res.status(500);
		res.error = err;
		res.results = null;

		if (next) {
			next();
		} else {
			Responses.endRequest(req, res);
		}
	}
};

module.exports = Responses;