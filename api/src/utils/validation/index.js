// joi lib
const Joi = require('joi');
// the hook object
const validate = require('feathers-hooks-validate-joi');
// translation file
const translations = require('./arabic');

// options set to convert by rules and the translation files
const joiOptions = { convert: true, abortEarly: false, language: translations };

// export lib object with wrapper for the validate function
module.exports = {
  Joi,
  validate(schema) {
    return validate.form(Joi.object().keys(schema), joiOptions);
  }
}
