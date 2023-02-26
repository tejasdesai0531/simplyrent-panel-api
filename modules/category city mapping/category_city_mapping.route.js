const express = require('express')
const router = express.Router()


const categoryCityMappingController = require('./category_city_mapping.controller')
const { addCategoryCityMappingValidators, categoryCityMappingListValidators} = require('./category_city_mapping.validator')


router.get('/', categoryCityMappingListValidators, categoryCityMappingController.getCategoryCityMappingList)
router.post('/', addCategoryCityMappingValidators, categoryCityMappingController.addCategoryCityMapping,)
router.put('/:id', addCategoryCityMappingValidators, categoryCityMappingController.editCategorycityMapping)



module.exports = router;