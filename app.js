/**
 * Module dependencies.
 */
var express = require('express')
,	path = require('path')
,	streams = require('./app/streams.js')();

var favicon = require('serve-favicon')
,	logger = require('morgan')
,	methodOverride = require('method-override')
, nunjucks = require('nunjucks')
,	bodyParser = require('body-parser')
,	errorHandler = require('errorhandler');

var app = express();
const isDev = app.get('env') === 'development';

// all environments
app.set('port', process.env.PORT || 8080);
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    watch: isDev,
    noCache: isDev,
    tags: {
      variableStart: '<=',
      variableEnd: '=>',
    }
});

app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use('/assets', express.static(path.join(__dirname, 'public')));

// development only
if (isDev) {
  app.use(errorHandler());
}

// const nunjucks = expressNunjucks(app, {
//   watch: isDev,
//   noCache: isDev
// });


// routing
require('./app/routes.js')(app, streams);

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
/**
 * Socket.io event handling
 */
require('./app/socketHandler.js')(io, streams);