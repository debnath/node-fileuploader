'use strict';

 /**
  *  Display the upload GUI screen when the user goes to http://localhost:3000
  */

exports.index = function(req, res, next) {
  res.sendfile("./html/index.html");
};
