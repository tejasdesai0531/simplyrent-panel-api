const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/upload-image')


const productIntervalController = require('./product_interval.controller')
const { addProductIntervalValidators, productIntervalListValidators} = require('./product_interval.validator')


router.get('/', productIntervalListValidators, productIntervalController.getProductIntervalList)
router.get('/:id', productIntervalController.getProductIntervalDetails)
router.post('/', addProductIntervalValidators, productIntervalController.addProductInterval)
router.put('/:id', addProductIntervalValidators, productIntervalController.editProductInterval)



module.exports = router;