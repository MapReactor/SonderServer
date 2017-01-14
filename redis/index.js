const config = require('./config.js');
var bluebird = require('bluebird');
var redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

console.log("Initializing Redis...");
console.log("REDIS_URL:" + JSON.stringify(config));

var createClient = (config === undefined) ?
  function () {
    return null;
  } : function () {
    return redis.createClient(config);
  }

module.exports = createClient;
