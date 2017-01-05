const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const request = require('supertest');

const config = require('./../db/config.js');
const app = require('../app.js');
const knex = require('knex')({
  client: 'pg',
  connection: config
})



// const dummyUser_one = {
//   body: {
//     username: 'fakeUser_one',
//     token: 'fakeToken_one'
//   }
// }

// const dummyUser_two = {
//   body: {
//     username: 'fakeUser_two',
//     token: 'fakeToken_two'
//   }
// }



describe('API Routes', function() {
  // let dbConnection;

  beforeEach(function(done) {
    console.log('before each');
    // Connect to db before each test
    require('knex')({
      client: 'pg',
      connection: config
    })
    // Empty the db table before each test
    knex('User').del();  
    done();
  });

  // afterEach(function() {
  //   knex.destroy();
  // });


  // describe('/users', function() {

  //   it ('should post a user', function(done) {
  //     request(app).post('/users', dummyUser_one, function(err) {
  //       if (err) {
  //         console.log(err);
  //       }
  //     })
  //     request(app).post('/users', dummyUser_two, function(err) {
  //       if (err) {
  //         console.log(err);
  //       }
  //     })
  //     .expect(function(res) {
  //       // console.log('res', res);
  //       expect(res.body).to.have.property('username')
  //       expect(res.body).to.have.property('token')
  //     })
  //     .end(done);
  //   })

    // it('should fetch all users', function(done) {
      // request(app).get('/users')
      // .expect(function(res) {
      //   expect(res.data.length).to.equal(2);
      // });
    //   re
    //   .end(done);
    // });

  // });

  // describe('get, /friends/:username', function() {
  //   // TODO
  // });

  // describe('get, /history/:username', function() {
  //   // TODO
  // });

  // describe('get, /location/:username', function() {
  //   // TODO
  // });

  // describe('post, /friends', function() {
  //   // TODO
  // });

  // describe('post, /location', function() {
  //   // TODO
  // });


  describe('/users', function() {
    it('should have /users path', function(done) {
      request(app).get('/users')
      .expect(function(res) {
        console.log('status', res.status);
        console.log(res.error);
        expect(res.status).should.equal(200)
      })
      .end(done);
    })
  })

});