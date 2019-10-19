const express = require('express');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = require('./config');
const indexRouter = require('./src/routes/index');
const apiRouter = require('./src/routes/api');
const adminRouter = require('./src/routes/admin');

const app = express();

const whitelist = [env.dev.frontEndHost];
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/admin', adminRouter);
// app.use('/users', usersRouter);
app.use('/api', apiRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
