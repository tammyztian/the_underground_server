'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const LiftingData = require('./liftingDataSchema');


//retrieve lifting data

router.get('/', jsonParser, (req, res, next) => {
  LiftingData.find()
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

//post lifting data

router.post('/', jsonParser, (req, res, next) => {
  const {deadlift, bench, squat} = req.body;
  LiftingData.create({deadlift, bench, squat})
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
