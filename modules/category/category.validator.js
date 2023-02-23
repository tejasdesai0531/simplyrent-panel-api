const { body, query} = require('express-validator')

const addCategoryValidators = [
    body('name').not().isEmpty(),
    body('code').not().isEmpty(),
    body('url_code').not().isEmpty(),
    body('image_url').not().isEmpty(),
    body('city_code').not().isEmpty(),
    body('status').isBoolean()
]


const categoriesListValidators = [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
]

module.exports = {
    addCategoryValidators,
    categoriesListValidators
}