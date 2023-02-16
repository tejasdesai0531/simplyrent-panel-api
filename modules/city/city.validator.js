const { body, query} = require('express-validator');

const addCityValidators = [
  body('name').not().isEmpty(),
  body('code').not().isEmpty(),
  body('status').isBoolean()
];

const cityListValidators =  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
  ]

module.exports = {
    addCityValidators,
    cityListValidators
}