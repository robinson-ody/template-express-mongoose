var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    pass_hash: {
      type: String,
      unique: false,
      required: true,
    },
  },

  { timestamps: true }
);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = user_schema;
