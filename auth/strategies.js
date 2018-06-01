'use strict';
const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const {User} = require('../users/userDataModel');
const {JWT_SECRET} = require('../config');

const localstrategy = ;

const jwtstrategy =;


module.exports = {localstrategy, jwtstrategy};