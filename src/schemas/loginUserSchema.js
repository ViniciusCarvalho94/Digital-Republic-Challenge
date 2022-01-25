const Joi = require('joi');

module.exports = Joi.object({
  cpf: Joi.string().regex(/(\d{3}\.){2}\d{3}-\d{2}/).required(),
  password: Joi.string().length(6).required(),
});
