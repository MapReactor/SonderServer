const apiRouter = require('express').Router();
const apiController = require('./apiController.js');

apiRouter.post('/location', apiController.updateLocation );


module.exports = apiRouter;
