//For Heroku Deployment
// var config = process.env.DATABASE_URL;
// module.exports = config;

//For Local Deployment
module.exports = {
  database: 'sonder',
  user: 'postgres',
  //password: 'postgres',
  port: 5432,
  host: 'localhost'
};
