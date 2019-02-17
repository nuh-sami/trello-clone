const Joi = require('joi');
const validate = require('feathers-hooks-validate-joi');
const translations = require('./arabic');

const joiOptions = { convert: true, abortEarly: false, language: translations };

module.exports = {
  Joi,
  validate(schema) {
    return validate.form(Joi.object().keys(schema), joiOptions);
  }
}
