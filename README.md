# Amazon S3 Uploader/Manager

A basic REST API to upload and manage files. First a file is uploaded to a local server directory, and then uploaded to S3.  A GUI form has also been provided to make uploading easier.

To setup, please use the following instructions:  

1. Git clone this repo!  
2. Edit file_upload/app/config/config.local.json and specify your AWS credentials + test bucket name.  
3. Navigate to the file_uploads root directory and run `npm install --save` to get all the dependencies  
4. Navigate to the 'app' folder and run `node server.js` (the upload directory should automatically appear after you do this)  
5. Open your browser and go to http://localhost:3000  
6. Select an image, hit upload. This will submit a POST request to http://localhost:3000/v1/images  
7. You will be redirected to the JSON response of the API query, which will contain the public url of the image. Repeat this operation as many times as you like with different images.   
8. Refresh the results page (i.e. do a GET on http://localhost:3000/v1/images) to see a list of all images uploaded to that bucket.  
 

That is all!  Other operations like individual GET, metadata, DELETE operations etc will all be added in later.....
