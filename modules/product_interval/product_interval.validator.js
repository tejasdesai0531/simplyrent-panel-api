const { body, query} = require('express-validator')

const addProductIntervalValidators = [
    body('duration').not().isEmpty()
]


const productIntervalListValidators = [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
]

module.exports = {
    addProductIntervalValidators,
    productIntervalListValidators
}