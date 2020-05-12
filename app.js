const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const helper=require('./helpers/db.js')();

//include Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter=require('./routes/movies');
const directorsRouter=require('./routes/directors');

//config
const config=require('./config');

//middleware
const verifyToken=require('./middleware/verify-token');


const app = express();

app.set('api_secret_key',config.api_secret_key);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',verifyToken);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/movies',moviesRouter);
app.use('/api/directors',directorsRouter);



// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error:err,msg:'lanet olsun'});
});

module.exports = app;
