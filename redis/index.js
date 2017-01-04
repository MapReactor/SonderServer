const config = require('./config.js');
var bluebird = require('bluebird');
var redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

console.log("Initializing Redis...");
console.log("REDIS_URL:" + config);

client = redis.createClient(config);

module.exports = client;
