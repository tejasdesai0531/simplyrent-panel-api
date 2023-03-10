const express = require('express')
const router = express.Router()


const productCityMappingController = require('./product_city_mapping.contoller')
const { addProductCityMappingValidators, productCityMappingListValidators} = require('./product_city_mapping.validator')


router.get('/', productCityMappingListValidators, productCityMappingController.getProductCityMappingList)
router.post('/', addProductCityMappingValidators, productCityMappingController.addProductCityMapping,)
router.put('/:id', addProductCityMappingValidators, productCityMappingController.editProductCityMapping)



module.exports = router;