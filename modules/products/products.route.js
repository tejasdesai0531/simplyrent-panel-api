const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/upload-image')


const productController = require('./products.controller')
const { addProductValidators, productsListValidators} = require('./products.validator')


router.get('/', productsListValidators, productController.getProductList)
router.get('/:id', productController.getProductDetails)
router.post('/', addProductValidators, productController.addProducts)
router.put('/:id', addProductValidators, productController.editProduct)
router.post('/upload', upload.single('image'), productController.uploadProductImage)



module.exports = router;