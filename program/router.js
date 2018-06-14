'use strict';

const express = require('express');
const router = express.Router();

const passport = require('passport');
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Program = require('./programModelSchema');


//retrieve data

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

  Program.findOne(filter)
    .then(result => {
      //console.log(result)
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => res.status(500).json({message: 'Internal server error'}));

});

//post initial day

router.post('/', jsonParser, (req, res, next) => {
  const userId = req.user._id;
  const {day} = req.body;

  if (!userId) {
    return res.status(422).json({
      code: 422,
      reason: 'Authorization Error',
      message: 'User not logged in',
      location: 'User'
    });
  }

  if (typeof day !== 'number'){
    return res.status(422).json({
      code: 422,
      reason: 'Bad Request',
      message: 'Day should be a number',
      location: 'Day'
    });
  }

  Program.create({day, userId})
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });

});

//update day

router.put('/', jsonParser, (req, res, next) => {
  const userId = req.user._id;
  const {day} = req.body;

  const updateDay ={day};
  
  if (!userId) {
    return res.status(422).json({
      code: 422,
      reason: 'Authorization Error',
      message: 'User not logged in',
      location: 'User'
    });
  }

  if (typeof day !== 'number'){
    return res.status(422).json({
      code: 422,
      reason: 'Bad Request',
      message: 'Day should be a number',
      location: 'Day'
    });
  }


  Program.findOneAndUpdate({userId}, updateDay, {new: true})
    .then(result => {
      //console.log(`result ${result}`);
      res.json(result);
    })
    .catch(err => res.status(500).json({message: 'Internal server error'}));

});


module.exports = router;
