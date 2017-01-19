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

exports.addUser = function (req, res) {
  if (req.body.id && req.body.displayname && req.body.email && req.body.token) {
    var user = {
      id: req.body.id,
      fb_id: req.body.id,
      displayname: req.body.displayname,
      email: req.body.email,
      picture: req.body.picture,
      token: req.body.token,
      following: []
    };
    let key = "USER://" + req.body.id;
    redis.set(key, JSON.stringify(user));
    res.send(user);
  } else {
    var error = { code: 400, message: 'addUser requires id, displayname, email, and token in request body' };
    res.status(400).send(error);
  }
};

exports.updateFriends = function (req, res) {
  if (req.body.id && req.body.friendlist && Array.isArray(req.body.friendlist)) {
    let key = "USER://" + req.body.id;
    redis.get(key, function(err, value){
      if (err) {
        res.send(err);
      } else {
        let user = JSON.parse(value);
        user.friendlist = req.body.friendlist.slice();
        friendsAdded = 0;
        for (var i = 0; i < req.body.friendlist.length; i++) {
          let friendKey = "USER://" + req.body.friendlist[i];
          redis.get(friendKey, function(error, val){
            if (error) {
              res.send(err);
            } else {
              let friend = JSON.parse(val);
              if (friend) {
                delete friend.following;
                user.following.push(friend);
              }
              friendsAdded++;
              if (friendsAdded === req.body.friendlist.length) {
                redis.set(key, JSON.stringify(user));
                res.send(user);
              }
            }
          })
        }
      }
    });
  } else {
    var error = { code: 400, message: "addFriend requires username and friendname in request body"};
    res.status(400).send(error);
  }
};

exports.getFriends = function (req, res) {
  if (req.params.id) {
    let key = "USER://" + req.params.id;
    redis.get(key, function(err, value){
      if (err) {
        res.send(err);
      } else {

        res.send(JSON.parse(value));
      }
    });
  } else {
    var error = { code: 400, message: "getFriends requires username as request parameter"};
    res.status(400).send(error);
  }
};
