const createError = require('http-errors');
const express = require('express');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const bodegaRouter = require('./routes/bodega');
const vinoRouter = require('./routes/vino');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (app.get('env') !== 'test') app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'scrum', resave: false, saveUninitialized: false }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/bodega', bodegaRouter);
app.use('/vino', vinoRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.title = 'Error';
  res.locals.status = err.status || 500;
  res.locals.message = err.message;
  res.locals.stack = req.app.get('env') === 'development' ? err.stack : '';
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
