const { body, query} = require('express-validator')

const addProductIntervalMappingValidators = [
    body('product_id').not().isEmpty(),
    body('interval_id').not().isEmpty(),
    body('price').not().isEmpty(),
    body('status').isBoolean()
]


const productIntervalMappingListValidators = [
    query('product_id').not().isEmpty()
    
]

module.exports = {
    addProductIntervalMappingValidators,
    productIntervalMappingListValidators
}