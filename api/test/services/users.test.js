const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });
});

//let mongoose = require('mongoose');
//let User = require('.. /../src/models/users.model');
const createModel = require('../../src/models/users.model');
// import {
//   users
// } from '../../src/models/users.model';
let User = app.get('mongooseClient').model('users', createModel.users); //createModel; //createModel.mongooseClient;
let chai = require('chai');
let chaiHttp = require('chai-http');
//let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  before(done => {
    User.remove({}, () => {
      done();
    });
  });
  // describe('/GET user', () => {
  //   it('it should GET all the users', (done) => {
  //     chai.request(app)
  //       .get('/user')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('array');
  //         res.body.length.should.be.eql(0);
  //         done();
  //       });
  //   });
  // });
  /*
   * Test the /POST route
   */
  const rannum = Math.floor(Math.random() * 10000);
  const email = 'hd' + rannum + '@gmail.com';
  describe('/POST user', () => {
    it('it should POST a user', done => {
      let user = {
        email: email,
        password: 'password_1395',
        active: false
      };
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          //chai.expect(res).to.have.status(201);
          chai.expect(res).to.have.status(201);
          done();
        });
    });
  });
  describe('/POST user', () => {
    it('it should not POST a duplicate user', done => {
      let user = {
        email: email, //'hdahash@yahoo.co.us',
        password: 'password_1395',
        active: false
      };
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.have.status(409);
          done();
        });
    });
  });

  describe('/POST user', () => {
    it('it should not POST with password less than 8 character', done => {
      let user = {
        email: 'hdahash@yahoo.co.us',
        password: 'pass',
        active: false
      };
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('/POST user', () => {
    it('it should not POST without active ', done => {
      let user = {
        email: 'hdahash@yahoo.co.us',
        password: 'password_1395',
      };
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('/POST user', () => {
    it('it should not POST without valid email', done => {
      let user = {
        email: 'hdahashyahoo.co.us',
        password: 'password_1395',
        active: false
      };
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe('/POST user', () => {
    it('it should not POST without valid email', done => {
      let user = {
        email: 'hdahash@yahoo.c',
        password: 'password_1395',
        active: false
      };
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          done();
        });
    });
  });

});
