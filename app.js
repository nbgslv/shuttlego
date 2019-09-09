const express = require('express');
const env = require('./config');

const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const uuid = require('uuid/v4');
const session = require('express-session');
const pg = require('pg');
const pgSession = require('connect-pg-simple');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiRouter = require('././routes/api');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');

const app = express();

const pgPool = new pg.Pool({
  host: env.dev.dbHost,
  user: env.dev.dbUser,
  password: env.dev.dbPass,
  database: env.dev.dbName,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// pgPool.connect();

const whitelist = [env.dev.frontEndHost];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(helmet());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  genid: () => uuid(),
  name: env.dev.sessionName,
  secret: env.dev.sessionSecret,
  resave: false,
  saveUninitialized: false,
  // eslint-disable-next-line global-require
  store: new (require('connect-pg-simple')(session))({
    pool: pgPool,
  }),
  cookie: {
    path: '/',
    maxAge: 100000000,
    secure: env.dev.env === 'development',
    sameSite: true,
  },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
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
