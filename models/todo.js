var db = require('../db');

exports.create = function(item,cb) {
  var itemToSave = {
    todo: item
  };
  return db.get().collection('todo').save(itemToSave, cb);
};

exports.all = function(cb) {
  return db.get().collection('todo').find().toArray(cb);
};
