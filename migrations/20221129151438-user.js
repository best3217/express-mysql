'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('users', {
    id: {
      type: 'bigInt',
      primaryKey: true,
      autoIncrement: true
    },
    unique_id: {
      type: 'string',
      length: 24
    },
    full_name: {
      type: 'string',
      length: 100
    },
    email: {
      type: 'string',
      length: 50
    },
    birthday: {
      type: 'date',
    },
    status: {
      type: 'string',
      length: 10
    },
    created_at: {
      type: 'date'
    },
    updated_at: {
      type: 'date'
    },
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};
