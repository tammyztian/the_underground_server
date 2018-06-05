'use strict';

const express = require('express');
const router = express.Router();

const passport = require('passport');
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Program = require('./programModelSchema');


//retrieve lifting data

router.get('/', jsonParser, (req, res, next) => {
  const userId = req.user._id;
  let filter = {userId};
  Program.find(filter)
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

//post initial day

router.post('/', jsonParser, (req, res, next) => {
  const userId = req.user._id;
  const {day} = req.body;
  Program.create({day, userId})
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

//update day

router.put('/', jsonParser, (req, res, next) => {
  const userId = req.user._id;
  const {day} = req.body;

  const updateDay ={day};
  console.log(req.user._id);
  console.log(day);
  console.log(updateDay);


  Program.findOneAndUpdate({userId}, updateDay, {new: true})
    .then(result => {
      console.log(`result ${result}`);
      res.json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
