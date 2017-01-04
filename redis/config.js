//For Heroku Deployment
var URI = require('urijs');
var config = URI.parse(process.env.REDIS_URL);
module.exports = config;
//REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)

// module.exports = {
//   host: uri.host,
//   port:uri.port,
//   password: uri.password
// };
