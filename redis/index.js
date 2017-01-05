const config = require('./config.js');
var bluebird = require('bluebird');
var redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

console.log("Initializing Redis...");
console.log("REDIS_URL:" + JSON.stringify(config));

var client = (config === undefined) ? null : redis.createClient(config);

module.exports = client;
