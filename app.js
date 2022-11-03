var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
//Imports user created controllers into the app
var aboutRouter = require('./controllers/about');
var categoriesRouter = require('./controllers/categories');


var app = express();

// db conn w/mongoose and environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
  .then((res) => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })


// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
//For app to user the created controllers
app.use('/about', aboutRouter);
app.use('/categories', categoriesRouter);

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

module.exports = app;
