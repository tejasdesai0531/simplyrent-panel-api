const express = require('express')
const router = express.Router()


const productIntervalMappingController = require('./product_interval_mapping.controller')
const { addProductIntervalMappingValidators, productIntervalMappingListValidators} = require('./product_interval_mapping.validator')


router.get('/', productIntervalMappingListValidators, productIntervalMappingController.getProductIntervalMappingList)
router.post('/', addProductIntervalMappingValidators, productIntervalMappingController.addProductIntervalMapping)
router.put('/:id', addProductIntervalMappingValidators, productIntervalMappingController.editProductIntervalMapping)



module.exports = router;