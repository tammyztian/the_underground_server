'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://user1:user1@ds239930.mlab.com:39930/the_underground',
  TEST_DATABASE_URL:process.env.TEST_DATABASE_URL ||'mongodb://localhost/thinkful-backend-test'
  // DATABASE_URL:
  //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //     process.env.TEST_DATABASE_URL ||
  //     'postgres://localhost/thinkful-backend-test'
};
