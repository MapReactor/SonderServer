//For Heroku Deployment
var URI = require('urijs');
var uri = URI.parse(process.env.REDIS_URL);
//REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)

module.exports = {
  host: uri.host,
  port:uri.port,
  password: uri.password
};
