// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    active: {
      type: Boolean,
      required: true
    },
    displayname: {
      type: String,
      required: true
    }


  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
