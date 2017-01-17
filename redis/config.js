//For Heroku Deployment
// var config = process.env.REDIS_URL;
// module.exports = config;

// For DigitalOcean Deployment
module.exports = {
  host:'localhost',
  port:'6379'
};

// For Local Deployment
// module.exports = {
//   host:'192.168.99.100',
//   port:'32768'
// };
