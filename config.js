'use strict';


module.exports = {
  PORT: process.env.PORT || 8080,
  //CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://theunderground.netlify.com/api',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://user1:user1@ds239930.mlab.com:39930/the_underground',
  TEST_DATABASE_URL:process.env.TEST_DATABASE_URL ||'mongodb://user01:user01@ds151970.mlab.com:51970/the_underground_test',
  JWT_SECRET: process.env.JWT_SECRET || 'default',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
  // DATABASE_URL:
  //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //     process.env.TEST_DATABASE_URL ||
  //     'postgres://localhost/thinkful-backend-test'
};
