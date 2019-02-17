const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect} = require('@feathersjs/authentication-local').hooks;
// validation utils to setup validation method
const {Joi, validate} = require('../../utils/validation');

// validation rules of the service
const rules = require('./users.validation');

let schema = rules.createRequest(Joi);

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [
      function (context) {
        //these line to delete the password text from the response
        try {
          context.error.message = context.error.message.replace(
            ' (`' + context.data.password + '`)',
            ''
          );
          context.error.errors.password.message = context.error.errors.password.message.replace(
            ' (`' + context.data.password + '`)',
            ''
          );
          context.error.errors.password.properties.message = context.error.errors.password.properties.message.replace(
            ' (`' + context.data.password + '`)',
            ''
          );
          delete context.error.errors.password.properties.value;
          delete context.error.errors.password.value;
          // eslint-disable-next-line no-empty
        } catch (err) {}
      }
    ],
    update: [],
    patch: [],
    remove: []
  }
};
