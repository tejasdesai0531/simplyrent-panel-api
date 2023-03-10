const { body, query} = require('express-validator')

const addProductCityMappingValidators = [
    body('city_id').not().isEmpty(),
    body('product_id').not().isEmpty(),
    body('status').isBoolean()
]


const productCityMappingListValidators = [
    query('city_id').not().isEmpty()
    
]

module.exports = {
    addProductCityMappingValidators,
    productCityMappingListValidators
}