
// Modules
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var routes = require('./routes');
var handlers = require('./routes/io.handlers');
var settings = require('./config/settings');
var db = require('./models');

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

// Socket.IO handlers
io.sockets.on('connection', handlers.connection);

// Launch
db.sequelize.sync().complete(function(err){
    if(err)
    {
        throw err;
    } else {
        server.listen(app.get('port'));
        console.log('Express server listening on port ' + app.get('port'));
    }
});
