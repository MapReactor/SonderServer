const apiRouter = require('express').Router();
const apiController = require('./apiController.js');

apiRouter.post('/location', apiController.updateLocation );
apiRouter.post('/users', apiController.addUser );
apiRouter.post('/friends', apiController.updateFriends );
apiRouter.get('/friends/:id', apiController.getFriends );


module.exports = apiRouter;
