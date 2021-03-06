var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it
var authChecker = require('./middleware/auth').authChecker;
var join = require('path').join;
var mongoose = require('mongoose');
var config = require('./config');
var exphbs = require('express-handlebars');

var registerRoutes = require('./infra/fileRecursive');

var index = require('./routes/web/indexRoutes');
var users = require('./routes/web/userRoutes');

var blog = require('./routes/admin/blogRoute');
var user = require('./routes/admin/userRoute');



registerRoutes(app);


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('.hbs', exphbs({
        defaultLayout: 'main', 
        extname: '.hbs',
        layoutsDir:'views/layouts',
        partialsDir:'views/partials'
}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'ssshhhhh'}));
// app.use(cookieParser());
// app.use(expressSession({ secret: 'somesecrettokenhere' }));

//app.use(express.static(path.join(__dirname, 'public')));

//const models = join(__dirname, 'model');
//app.use(express.static(path.resolve(__dirname, 'public')));


// Bootstrap models
const models = join(__dirname, 'model');
// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));



//TODO: I will bootstrap config here
app.use(function (req, res, next) {
    req.root = 'test';
    next();
});


// Bootstrap routes
app.use('/', index);
app.use('/users', users);
app.use('/admin/blog', blog);
app.use('/admin/user', user);



connect()
  .on('error', console.log)
  .on('disconnected', connect)
//.once('open', listen);


console.log(config.db);

// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });


// Connect to Mongo on start
function connect() {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
  return mongoose.connect("mongodb://blog:asdas@asdsadsa/blog", options).connection;
}

module.exports = app;
