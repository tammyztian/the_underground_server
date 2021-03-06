'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const liftingDataSchema = mongoose.Schema ({
  deadlift:{type: Number, default: 0},
  bench:{type: Number, default: 0},
  squat:{type: Number, default: 0},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

liftingDataSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret.userId;
    delete ret._id;
    delete ret.__v;
  }
});

const LiftingData = mongoose.model('LiftingData', liftingDataSchema);
module.exports = LiftingData, liftingDataSchema;


