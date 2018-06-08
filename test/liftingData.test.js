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

describe('/api/lifts', function () {
  const username = 'SallyIam';
  const password = 'ImaG8888088';
  const firstName = 'Sally';
  const lastName = 'Student';
  let token;
  let user;

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
      .then((user_) =>{
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
        'squat': 400,
      };
      let body;
      return chai.request(app)
        .post('/api/lifts')
        .set('Authorization', `Bearer ${token}`)
        .send(newItem)
        .then(function (res) {
          body = res.body;
          expect(res).to.have.status(201);
          expect(res).to.have.header('location');
          expect(res).to.be.json;
          expect(body).to.be.a('object');
          expect(body).to.include.keys(
            'squat', 'deadlift', 'bench', 'id', 'createdAt', 'updatedAt');       
        });
    });
  });
  

  describe('GET', function () {
    it('should get correct list of the lifts by a user', function () {
      return Promise.all([
        Liftingdata.find({userId: user.id}),
        chai.request(app)
          .get('/api/lifts')
          .set('Authorization', `Bearer ${token}`)
      ])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);       
        });
    });
  });
});