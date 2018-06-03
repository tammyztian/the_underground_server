'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const {JWT_SECRET, JWT_EXPIRY} =  require('../config');
const router = express.Router();


const options = {session: false, failWithError: true};
const localAuth = passport.authenticate('local', options);

const createAuthToken = function(user) {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
  });
};


router.use(bodyParser.json());
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});


module.exports = router;
