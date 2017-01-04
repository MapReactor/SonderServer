//For Heroku Deployment
var URI = require('urijs');
var config = URI.parse(process.env.DATABASE_URL);
config['ssl'] = true;

module.exports = config;
// module.exports = {
//   database: 'sonder',
//   user: 'postgres',
//   //password: 'postgres',
//   port: 32769,
//   host: '192.168.99.100'
// };
