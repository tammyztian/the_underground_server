// 'use strict';
// const { app, runServer, closeServer } = require('../index');

// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const {TEST_DATABASE_URL} = require('../config');


// process.env.NODE_ENV = 'test';
// process.stdout.write('\x1Bc\n');

// const expect = chai.expect;

// chai.use(chaiHttp);

// before(function() {
//   return runServer(TEST_DATABASE_URL);
// });

// after(function() {
//   return closeServer();
// });


// describe('Environment', () => {

//   it('NODE_ENV should be "test"', () => {
//     expect(process.env.NODE_ENV).to.equal('test');
//   });

// });

// describe('Basic Express setup', () => {

//   describe('404 handler', () => {

//     it('should respond with 404 when given a bad path', () => {
//       return chai.request(app)
//         .get('/bad/path')
//         .then(res => {
//           console.log(res);
//           expect(res).to.have.status(404);
//           expect(res.message).to.equal('Not Found');
//         });
//     });

//   });
// });