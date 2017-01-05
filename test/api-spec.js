const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
var stubs = require('./Stubs');
//const request = require('supertest');

const apiController = require('../apiController.js');
//console.log(JSON.stringify(apiRouter));

describe('All API route controllers exist', function() {
  it('should have a getUsers controller', function() {
    expect(apiController.getUsers).to.exist;
  });
  it('should have a getFriends controller', function() {
    expect(apiController.getFriends).to.exist;
  });
  it('should have a getHistory controller', function() {
    expect(apiController.getHistory).to.exist;
  });
  it('should have a addUser controller', function() {
    expect(apiController.addUser).to.exist;
  });
  it('should have a addFriend controller', function() {
    expect(apiController.addFriend).to.exist;
  });
  it('should have a updateLocation controller', function() {
    expect(apiController.updateLocation).to.exist;
  });
});

describe('Test POST to /api/users', function() {
  describe('It should require id, displayname, email, and token', function() {
    it('should return 400 error if missing id', function() {
      var stubMsg = {
        displayname: 'Dohn Joe',
        email: 'hill@bil.ly',
        token: 'This is the story of a girl who cried a river and drown the whole world.'
      };
      var req = new stubs.request('/api/users', 'POST', stubMsg);
      var res = new stubs.response();
      apiController.addUser(req,res);
      expect(res._responseCode).to.equal(400);
    });
    it('should return 400 error if missing displayname', function() {
      var stubMsg = {
        id: '123456789',
        email: 'hill@bil.ly',
        token: 'This is the story of a girl who cried a river and drown the whole world.'
      };
      var req = new stubs.request('/api/users', 'POST', stubMsg);
      var res = new stubs.response();
      apiController.addUser(req,res);
      expect(res._responseCode).to.equal(400);
    });
    it('should return 400 error if missing email', function() {
      var stubMsg = {
        id: '123456789',
        displayname: 'Dohn Joe',
        token: 'This is the story of a girl who cried a river and drown the whole world.'
      };
      var req = new stubs.request('/api/users', 'POST', stubMsg);
      var res = new stubs.response();
      apiController.addUser(req,res);
      expect(res._responseCode).to.equal(400);
    });
    it('should return 400 error if missing token', function() {
      var stubMsg = {
        id: '123456789',
        displayname: 'Dohn Joe',
        email: 'hill@bil.ly',
      };
      var req = new stubs.request('/api/users', 'POST', stubMsg);
      var res = new stubs.response();
      apiController.addUser(req,res);
      expect(res._responseCode).to.equal(400);
    });
    it('should make DB call if all fields are present', function() {
      var stubMsg = {
        id: '123456789',
        displayname: 'Dohn Joe',
        email: 'hill@bil.ly',
        token: 'This is the story of a girl who cried a river and drown the whole world.'
      };
      var req = new stubs.request('/api/users', 'POST', stubMsg);
      var res = new stubs.response();
      apiController.addUser(req,res);
      expect(res._responseCode).to.equal(null);
    });
  });
});
