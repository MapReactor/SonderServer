const redis = require('./redis')();

exports.updateLocation = function (req, res) {
  if (req.body.longitude && req.body.latitude && req.body.id) {
    var location = {
      'id': req.body.id,
      'longitude': req.body.longitude,
      'latitude': req.body.latitude,
    };
    redis.publish(req.body.id, JSON.stringify(location));
    res.send(location);
  } else {
    var error = { code: 400, message: "updateLocation requires id, longitude, and latitude in request body"};
    res.status(400).send(error);
  }
};
