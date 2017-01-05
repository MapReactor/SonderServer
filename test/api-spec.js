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
