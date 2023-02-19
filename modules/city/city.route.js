const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/upload-image')

const cityController = require('./city.controller')
const  {addCityValidators,  cityListValidators} = require('./city.validator')


router.get('/', cityListValidators, cityController.getCityList)
router.get('/:id', cityController.getCityDetails)
router.post('/', upload.single('image'), addCityValidators, cityController.addCity)
router.put('/:id',  upload.single('image'), addCityValidators, cityController.editCity)



module.exports = router;