const { body, query} = require('express-validator');

const addBannerValidators = [
  body('image_url').not().isEmpty(),
  body('redirect_url').not().isEmpty(),
  body('status').isBoolean()
];

const bannerListValidators =  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
  ]

module.exports = {
    addBannerValidators,
    bannerListValidators
}