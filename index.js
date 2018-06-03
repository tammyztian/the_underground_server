'use strict';

const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

//import auth 
const authRouter = require('./auth/router');
const localStrategy = require('./auth/strategies');

const userRouter = require('./users/router');
const liftingDataRouter = require('./liftingData/router');

//create express app
const app = express();

//log all request, skip during testing
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

//replacement for CORS below
app.use((req, res, next) => { 
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials','true'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization'); 
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');

  if(req.method === 'OPTIONS') { return res.sendStatus(204); } return next(); 

});

passport.use(localStrategy);
//passport.use(jwtStrategy);



//mount routers
app.use('/api/user', userRouter);
app.use('/api', authRouter);
app.use('/api/lifts', liftingDataRouter);

//catch all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status= 404;
  next(err);
});

//catch-all error handler
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

//listing for incoming connections
function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports =  app ;
