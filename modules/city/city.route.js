const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/upload-image')

const cityController = require('./city.controller')
const  {addCityValidators,  cityListValidators} = require('./city.validator')


router.get('/', cityListValidators, cityController.getCityList)
router.get('/:id', cityController.getCityDetails)
router.post('/', addCityValidators, cityController.addCity)
router.put('/:id', addCityValidators, cityController.editCity)
router.post('/upload', upload.single('image'), cityController.uploadImage)




module.exports = router;