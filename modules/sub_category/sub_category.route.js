const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/upload-image')


const subCategoriesController = require('./sub_category.controller')
const { addSubCategoryValidators, subCategoriesListValidators} = require('./sub_category.validator')


router.get('/', subCategoriesListValidators, subCategoriesController.getSubCategoryList)
router.get('/:id', subCategoriesController.getSubCategoryDetails)
router.post('/', addSubCategoryValidators, subCategoriesController.addSubCategories)
router.put('/:id', addSubCategoryValidators, subCategoriesController.editSubCategory)
router.post('/upload', upload.single('image'), subCategoriesController.uploadSubCategoryImage)



module.exports = router;