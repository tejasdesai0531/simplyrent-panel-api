const {body} = require('express-validator')

function addCityValidator() {
    return [
        body('name').notEmpty().withMessage('name is required'),
        body('code').notEmpty().withMessage('code is required')
    ]
}

module.exports = {
    addCityValidator
}