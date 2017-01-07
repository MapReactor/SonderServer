const apiRouter = require('express').Router();
const apiController = require('./apiController.js');

apiRouter.get('/users', apiController.getUsers );
apiRouter.get('/friends/:id', apiController.getFriends );
apiRouter.get('/history/:id', apiController.getHistory );
apiRouter.get('/locations/:id', apiController.getLocations );

apiRouter.post('/users', apiController.addUser );
apiRouter.post('/friends', apiController.updateFriends );
apiRouter.post('/location', apiController.updateLocation );


module.exports = apiRouter;
