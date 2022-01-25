const Joi = require('joi');

module.exports = Joi.object({
  cpf: Joi.string().regex(/(\d{3}\.){2}\d{3}-\d{2}/).required(),
  value: Joi.number().integer().min(1).required(),
});
