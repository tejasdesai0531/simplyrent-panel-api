const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/upload-image')


const categoriesController = require('./category.controller')
const { addCategoryValidators, categoriesListValidators} = require('./category.validator')


router.get('/', categoriesListValidators, categoriesController.getCategoryList)
router.get('/:id', categoriesController.getCategoryDetails)
router.post('/', addCategoryValidators, categoriesController.addCategories)
router.put('/:id', addCategoryValidators, categoriesController.editCategory)
router.post('/upload', upload.single('image'), categoriesController.uploadCategoryImage)



module.exports = router;