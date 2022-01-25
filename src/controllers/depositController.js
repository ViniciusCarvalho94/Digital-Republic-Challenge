const depositService = require('../services/depositService');

module.exports = async (req, res, next) => {
  try {
    const { cpf, value } = req.body;

    const response = await depositService(cpf, value);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};
