const { body, query} = require('express-validator')

const addSubCategoryValidators = [
    body('name').not().isEmpty(),
    body('url_code').not().isEmpty(),
    body('image_url').not().isEmpty(),
    body('category_id').not().isEmpty(),
]


const subCategoriesListValidators = [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
]

module.exports = {
    addSubCategoryValidators,
    subCategoriesListValidators
}