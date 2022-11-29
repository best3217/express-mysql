"user strict";

var Validator = require('jsonschema').Validator;
var valid = require('validator');
var v = new Validator();

var userSchema = {
  "id": "/add-user-account",
  "type": "object",
  "properties": {
    "full_name": {"type": "string"},
    "email": {"type": "email"},
    "birthday": {"type": "string"}
  },
  "required": ["full_name", "email", "birthday"]
};

v.addSchema(userSchema, '/add-user-account');
v.addSchema(userSchema, '/update-user-account');

const User = function (user) {
  this.unique_id = user.uniqueId;
  this.full_name = user.full_name;
  this.email = user.email;
  this.birthday = user.birthday;
  this.status = user.status;
  this.created_at = new Date();
  this.updated_at = new Date();
};

User.create = function (user, result) {
  var emailValid = valid.isEmail(user.email)
  var dateValid = valid.isDate(user.birthday)
  if(!emailValid) {
    result("email is not valid", null)
  }else if(!dateValid) {
    result("date is not valid", null)
  }else {
    var validation = v.validate(user, userSchema);
    if(!validation.valid) {
      result(validation.errors[0]?.stack, null)
    }else {
      connection.query("INSERT INTO users set ?", user, function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      });
    }
  }
};

User.read = function (result) {
  connection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.readById = function (id, result) {
  connection.query("SELECT * FROM users WHERE id = ?", id, function(
    err,
    res
  ) {
    if (err) {
      result(null, res)
    } else {
      result(null, res);
    }
  })
}

User.update = function (id, user, result) {
  var validation = v.validate(user, userSchema);
  var emailValid = valid.isEmail(user.email)
  var dateValid = valid.isDate(user.birthday)
  if(!emailValid) {
    result("email is not valid", null)
  }else if(!dateValid) {
    result("date is not valid", null)
  }else {
    if(!validation.valid) {
      result(validation.errors[0]?.stack, null)
    }else {
      connection.query("UPDATE users SET ? WHERE id = ?", [user, id], function (
        err,
        res
      ) {
        if (err) {
          result(null, err);
        } else {
          result(null, res);
        }
      });
    }
  }
};

User.delete = function (id, result) {
  connection.query("DELETE FROM users WHERE _id = ?", [id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
