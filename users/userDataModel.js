'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default:'',
  },
});


UserSchema.set('toObject', {
  transform: function(doc, ret){
    ret.it = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.passowrd);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};