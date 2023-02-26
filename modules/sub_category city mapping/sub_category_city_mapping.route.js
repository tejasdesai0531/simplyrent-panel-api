const express = require('express')
const router = express.Router()


const subCategoryCityMappingController = require('./sub_category_city_mapping.controller')
const { addSubCategoryCityMappingValidators, subCategoryCityMappingListValidators} = require('./sub_category_city_mapping.validator')


router.get('/', subCategoryCityMappingListValidators, subCategoryCityMappingController.getSubCategoryCityMappingList)
router.post('/', addSubCategoryCityMappingValidators, subCategoryCityMappingController.addSubCategoryCityMapping,)
router.put('/:id', addSubCategoryCityMappingValidators, subCategoryCityMappingController.editSubCategorycityMapping)



module.exports = router;