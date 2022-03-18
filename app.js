var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({path: __dirname + '/.env'});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var fs = require('fs');
var https = require('https');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if(fs.existsSync('/etc/letsencrypt/live/bacowine.live/fullchain.pem') && fs.existsSync('/etc/letsencrypt/live/bacowine.live/privkey.pem')) {
	https.createServer({
	  cert: fs.readFileSync('/etc/letsencrypt/live/bacowine.live/fullchain.pem'),
	  key: fs.readFileSync('/etc/letsencrypt/live/bacowine.live/privkey.pem')
	 },app).listen(443, function(){
		console.log('Servidor https corriendo en el puerto 443');
	});
};

//LANZAMIENTO DEL SERVIDOR
const PORT = process.env.NODE_LOCAL_PORT || 80;
app.listen(PORT, function(err){
  if(err){ 
    console.log("No se pudo inicializar el servidor" + err.message);
  }else{
    console.log(`Servidor arrancado en el puerto ${PORT}`);
  } 
});

module.exports = app;
