'use strict';

/**
 * Default functions for multer configuration. 
 */

var MulterDef = {
    dest: './uploads/',  //@todo get from config
    rename: function(fieldname, filename) 
    {
      return filename + Date.now();
    },
    onFileUploadStart: function(file)
    {
      console.log(file.originalname + ' is starting to upload to local folder...');
    },
    onFileUploadComplete: function(file) 
    {
      console.log(file.originalname + ' has completed uploading to local folder ...');
    }
};

module.exports = MulterDef;