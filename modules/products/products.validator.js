const { body, query} = require('express-validator')

const addProductValidators = [
    body('name').not().isEmpty(),
    body('url_code').not().isEmpty(),
    body('deposit').not().isEmpty(),
    body('image_url').not().isEmpty(),
]


const productsListValidators = [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
]

module.exports = {
    addProductValidators,
    productsListValidators
}