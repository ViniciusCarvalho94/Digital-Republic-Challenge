const transferService = require('../services/transferService');

module.exports = async (req, res, next) => {
  try {
    const fromAccount = req.findUser;
    const toAccount = req.body;

    const response = await transferService(fromAccount, toAccount);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};
