const User = require("../models/user");

exports.createUser = async (req, res) => {
  var random = require('random-string-alphanumeric-generator');
  var unique_id = random.randomAlphanumeric(24, "lowercase") //generate unique uniqueId
  const user = new User(req.body);
  user.unique_id = unique_id;
  user.status = "activity";
  var now = new Date();
  var birthDate = new Date(user.birthday);
  var currentYear = now.getFullYear();
  var birthYear = birthDate.getFullYear();
  var age = currentYear - birthYear;
  if(age < 18) {
    return res.status(400).send({
      message: "user must be at least 18 years old"
    })
  }
  User.create(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(user);
  });
};

exports.readUser = async (req, res) => {
  User.read(function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(user);
  });
};

exports.updateUser = async (req, res) => {
  const id = req.params.userId;
  return User.readById(id, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }

    if(String(user[0].status) !== "activity") {
      return res.status(403).json({
        message: "user is not activity status"
      })
    }else {
      User.update(id, req.body, function (err, user) {
        if (err) {
          return res.status(403).send(err);
        }
        res.json(user);
      });
    }
  });
};

exports.removeUser = async (req, res) => {
  const id = req.params.userId;

  return User.readById(id, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }

    if(String(user[0].status) !== "activity" && String(user[0].status) !== "suspended") {
      return res.status(403).json({
        message: "user is not activate or suspended status"
      })
    }else {
      User.update(id, {status: "archived"}, function (err, user) {
        if (err) {
          return res.status(403).send(err);
        }
        res.json(user);
      });
    }
  });
};

exports.suspendUser = async (req, res) => {
  const id = req.params.userId;

  return User.readById(id, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }

    if(String(user[0].status) !== "activity") {
      return res.status(403).json({
        message: "user is not activity status"
      })
    }else {
      User.update(id, {status: "suspended"}, function (err, user) {
        if (err) {
          return res.status(403).send(err);
        }
        res.json(user);
      });
    }
  });
};

exports.reactiveUser = async (req, res) => {
  const id = req.params.userId;

  return User.readById(id, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    if(String(user[0].status) !== "suspended") {
      return res.status(403).json({
        message: "user is not suspended status"
      })
    }else {
      User.update(id, {status: "activity"}, function (err, user) {
        if (err) {
          return res.status(403).send(err);
        }
        res.json(user);
      });
    }
  });
};