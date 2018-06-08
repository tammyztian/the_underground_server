'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const programSchema = mongoose.Schema ({
  currentProgram:{type: String, default: 'Iron Summer'},
  day:{type: Number, default: 0},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

programSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret.userId;
    delete ret._id;
    delete ret.__v;
  }
});


const Program = mongoose.model('Program', programSchema);
module.exports = Program, programSchema;


