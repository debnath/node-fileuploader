var config = require('./config'),
wiring = require('./../lib/wiring'),
port = config.port;

var app = module.exports = wiring({
    config: config,
    apiVersions: config.app.apiVersions,
        externalRoutes: []  //plug in routes form npm modules here;
  });



app.listen(port, function()
{
    console.log("Listening on port " + port);
});