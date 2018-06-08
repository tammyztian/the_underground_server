'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../index');
const { TEST_DATABASE_URL } = require('../config');

// const  User  = require('../users/userDataModel');
const  Liftingdata = require('../liftingData/liftingDataSchema');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/api/program', function () {
  const username = 'SallyIam';
  const password = 'ImaG8888088';
  const firstName = 'Sally';
  const lastName = 'Student';
  let token;
  let user;
  let id;
  let userId;

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });

  beforeEach(function () { 
    return chai
      .request(app)
      .post('/api/user')
      .send({
        username,
        password,
        firstName,
        lastName
      })
      .then(user_ =>{
        user = user_;
        return  chai
          .request(app)
          .post('/api/auth/login')
          .send({ username, password })
          .then(res => {
            token = res.body.authToken;
          });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });
  
  describe('POST', function () {
    it('should create and return a new item when provided valid data', function () {
      const newItem = {
        'day': 0,
      };
      let body;
      return chai.request(app)
        .post('/api/program')
        .set('Authorization', `Bearer ${token}`)
        .send(newItem)
        .then(function (res) {
          body = res.body;
          expect(res).to.have.status(201);
          expect(res).to.have.header('location');
          expect(res).to.be.json;
          expect(body).to.be.a('object');
          expect(body).to.include.keys('createdAt', 'currentProgram', 'day', 'id', 'updatedAt');       
        });
    });
  });
  

  // describe('PUT', function () {
  //   it('should up date and return item when provided valid data', function () {
  //     const updateItem = {
  //       'day': 4,
  //     };
  //     let body;
  //     return chai.request(app)
  //       .put('/api/program')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(updateItem)
  //       .then(function (res) {
  //         body = res.body;
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.json;
  //         expect(body).to.be.a('object');
  //         expect(body).to.include.keys('createdAt', 'currentProgram', 'day', 'id', 'updatedAt');       
  //       });
  //   });
  // });

  // describe('GET', function () {
  //   it('should get user program info', function () {
    
  //     return chai.request(app)
  //       .get('/api/program')
  //       .set('Authorization', `Bearer ${token}`)
  //       .then(res => {
  //         id = res.body.id;
  //         userId = res.body.userId;
  //       })
    
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.json;
  //         expect(res.body).to.be.a('object');
  //       });
  //   });
  // });
});