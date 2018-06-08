'use strict';

const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const User = require('../users/userDataModel');
const {JWT_SECRET} = require('../config');

const localStrategy = new LocalStrategy((username, password, done) =>{
  let user;
  User.findOne({username})
    .then(result => {
      user = result;
      if(!user){
        return Promise.reject({
          reason: 'Login error',
          message: 'Incorrect username',
          location:'username'
        });
      } 
    
      return  user.validatePassword(password);

    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'Login error',
          message: 'Incorrect password',
          location: 'password'
        });
      }
      return done (null, user);
    })
    .catch(err => {
      if (err.reason === 'Login error'){
        return done (null, false);
      }
      return done(err);
    });
});

const jwtStrategy = new JwtStrategy(
  {secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  },
  (payload, done) => {
    done(null, payload.user);
  }
);

module.exports = {localStrategy, jwtStrategy};