const { body, query} = require('express-validator')

const addSubCategoryCityMappingValidators = [
    body('city_id').not().isEmpty(),
    body('sub_category_id').not().isEmpty(),
    body('status').isBoolean()
]


const subCategoryCityMappingListValidators = [
    query('city_id').not().isEmpty()
    
]

module.exports = {
    addSubCategoryCityMappingValidators,
    subCategoryCityMappingListValidators
}