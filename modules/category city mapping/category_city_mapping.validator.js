const { body, query} = require('express-validator')

const addCategoryCityMappingValidators = [
    body('city_id').not().isEmpty(),
    body('category_id').not().isEmpty(),
    body('status').isBoolean()
]


const categoryCityMappingListValidators = [
    query('city_id').not().isEmpty()
    
]

module.exports = {
    addCategoryCityMappingValidators,
    categoryCityMappingListValidators
}