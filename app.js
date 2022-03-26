const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');

const indexRouter = require('./routes/index');
const bodegaRouter = require('./routes/bodega');
const vinosRouter = require('./routes/vinos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (app.get('env') !== 'test') app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().any());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bodega', bodegaRouter);
app.use('/vinos', vinosRouter);

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
