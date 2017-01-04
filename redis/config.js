//For Heroku Deployment
var uri = URI.parse(ENV["REDIS_URL"]);
//REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)

module.exports = {
  host: uri.host,
  port:uri.port,
  password: uri.password
};
