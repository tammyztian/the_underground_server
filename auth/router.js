'use strict';

const express = require('express');
const router = express.Router();

const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY } = require('../config');

module.exports = router;
