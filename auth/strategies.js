'use strict';
const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const {User} = require('../users/userDataModel');
const {JWT_SECRET} = require('../config');

const localstrategy = new localStrategy ((username, password, callback) =>{
  let user;
  //define user to make accecssable outside call
  User.findOne({username: username})
    .then(_user=>{
      user =_user;
      if (!user){
        return Promise.reject({
          reason: 'LoginError',
          message:'Incorrect username or password'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message:'Incorrect username or password'
        });
      }
      return callback(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError'){
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

const jwtstrategy =;


module.exports = {localstrategy, jwtstrategy};