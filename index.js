'use strict';

const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const { PORT, DATABASE_URL} = require('./config');
//const { dbConnect } = require('./db-mongoose');

//import auth 
const authRouter = require('./auth/router');
const {localStrategy, jwtStrategy} = require('./auth/strategies')

const userRouter = require('./users/router');
const liftingDataRouter = require('./liftingData/router');
const programRouter = require('./program/router');

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
passport.use(jwtStrategy);



//mount routers
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/lifts', liftingDataRouter);
app.use('/api/program', programRouter);


//error for any undeclared endpoints
app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
