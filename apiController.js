const db = require('./db');
const redis = require('./redis');
const User = require('./models/user.js');
const Users = require('./models/users.js');
const Location = require('./models/location.js');
const Locations = require('./models/locations.js');

//TODO:
// Send back userid and username but not token
exports.getUsers = function (req, res) {
  Users.reset().fetch().then(function(users) {
    res.status(200).send(users.models);
  });
};

exports.getFriends = function (req, res) {
  if (req.params.id) {
    new User({
      fb_id: req.params.id
    }).fetch({withRelated: 'following'}).then(function(user) {
      res.send(user);
    });
  } else {
    var error = { code: 400, message: "getFriends requires username as request parameter"};
    res.status(400).send(error);
  }
};

exports.getHistory = function (req, res) {
  if (req.params.id) {
    new User({
      fb_id: req.params.id
    }).fetch({withRelated: 'locations'}).then(function(user) {
      res.send(user);
    });
  } else {
    var error = { code: 400, message: "getHistory requires username as request parameter"};
    res.status(400).send(error);
  }
};

//TODO get location is not currently returning the latest location, but rather is returning all location data.
exports.getLocations = function (req, res) {
  if (req.params.id) {
    new User({
      fb_id: req.params.id
    }).fetch({withRelated: 'following'}).then(function(user) {
      // get the friend location data.
      var user = JSON.parse(JSON.stringify(user));
      var friends = [];
      for (var i = 0; i < user.following.length; i++) {
        friends.push(user.following[i]["fb_id"]);
      }
      if (friends.length > 0) {
        redis.mget(friends, function(err, value){
          if (err) {
            res.send(err);
          } else {
            res.send(JSON.parse('[' + value + ']'));
          }
        });
      } else {
        res.send([]);
      }
    });
  } else {
    var error = { code: 400, message: "getLocation requires username as request parameter"};
    res.status(400).send(error);
  }
};

//TODO:
// 1) ensure only one user of same name
// 2) sanity check on data
exports.addUser = function (req, res) {
  if (req.body.id && req.body.displayname && req.body.email && req.body.token) {
    Users.create({
      fb_id: req.body.id,
      displayname: req.body.displayname,
      email: req.body.email,
      picture: req.body.email,
      token: req.body.token
    }).then(function(user) {
      res.send(user);
    }).catch( function(error) {
      var error = { code: 401, message: error };
      res.status(401).send(error);
    });
  } else {
    var error = { code: 400, message: 'addUser requires id, displayname, email, and token in request body' };
    res.status(400).send(error);
  }
};

exports.updateFriends = function (req, res) {
  if (req.body.id && req.body.friendlist && Array.isArray(req.body.friendlist)) {
    new User({
      fb_id: req.body.id
    }).fetch().then(function(user) {
      //loop through friendlist and find those who:
        // are already friends (do nothing)
        // are new friends (add them)
        // are no longer friends (remove them)
      friendsAdded = 0;
      for (var i = 0; i < req.body.friendlist.length; i++) {
        new User({
          fb_id: req.body.friendlist[i]
        }).fetch().then(function(friend) {
          user.following().attach(friend);
          friendsAdded++;
          if (friendsAdded === req.body.friendlist.length) {
            new User({
              fb_id: req.body.id
            }).fetch({withRelated: 'following'}).then(function(user) {
              res.send(user);
            });
          }
        });
      }
    }).catch( function(error) {
      var err = { code: 401, message: error };
      res.status(401).send(err);
    });
  } else {
    var error = { code: 400, message: "addFriend requires username and friendname in request body"};
    res.status(400).send(error);
  }
};

//Deprecated - see updateFriends
exports.addFriend = function (req, res) {
  if (req.body.username && req.body.friendname) {
    new User({
      username: req.body.username
    }).fetch().then(function(user) {
      new User({
        username: req.body.friendname
      }).fetch().then(function(friend) {
        user.following().attach(friend);
        res.send(user);
      });
    });
  } else {
    var error = { code: 400, message: "addFriend requires username and friendname in request body"};
    res.status(400).send(error);
  }
};

exports.updateLocation = function (req, res) {
  if (req.body.longitude && req.body.latitude && req.body.bearing && req.body.id) {
    var location = {
      'longitude': req.body.longitude,
      'latitude': req.body.latitude,
      'bearing': req.body.bearing,
    };
    new User({
      fb_id: req.body.id
    }).fetch().then(function(user) {
      location['user_id'] = req.body.id;
      Locations.create(location).then( function(location) {
        redis.set(req.body.id, JSON.stringify(location));
        res.send(location);
      });
    }).catch( function(error) {
      var error = { code: 401, message: error };
      res.status(401).send(error);
    });
  } else {
    var error = { code: 400, message: "updateLocation requires id, longitude, latitude, and bearing  in request body"};
    res.status(400).send(error);
  }
};
