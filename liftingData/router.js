'use strict';

const express = require('express');
const router = express.Router();

const passport = require('passport');
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const LiftingData = require('./liftingDataSchema');


//retrieve lifting data

router.get('/', jsonParser, (req, res, next) => {
  const userId = req.user._id;
  let filter = {userId};

  if (!userId) {
    return res.status(422).json({
      code: 422,
      reason: 'Authorization Error',
      message: 'User not logged in',
      location: 'User'
    });
  }
  
  LiftingData.find(filter)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//post lifting data

router.post('/', jsonParser, (req, res, next) => {
  const userId = req.user._id;
  const {deadlift, bench, squat} = req.body;

  if (!userId) {
    return res.status(422).json({
      code: 422,
      reason: 'Authorization Error',
      message: 'User not logged in',
      location: 'User'
    });
  }

  LiftingData.create({deadlift, bench, squat, userId})
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;
