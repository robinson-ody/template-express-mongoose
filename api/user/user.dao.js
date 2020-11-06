const mongoose = require('mongoose');
const user_schema = require('./user.model');

user_schema.statics = {
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },

  findByEmail: (email, cb) => {
    return new Promise(res => {
      res(user_model.findOne({ email }, cb));
    });
  },
};

const user_model = mongoose.model('User', user_schema);
module.exports = user_model;
