
// Modules
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var settings = require('./config/settings');
var db = require('./models');

var app = express();

// Settings
app.set('port', settings.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(settings.secret));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes
app.get('/', routes.index);

// Launch
db.sequelize.sync().complete(function(err){
    if(err)
    {
        throw err;
    } else {
        http.createServer(app).listen(app.get('port'), function(){
          console.log('Express server listening on port ' + app.get('port'));
        });
    }
});
