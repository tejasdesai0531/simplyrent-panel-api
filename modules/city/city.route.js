const express = require('express')
const router = express.Router()

const cityController = require('./city.controller')
const cityValidator = require('./city.validator')
console.log(cityValidator)

router.get('/', cityController.getCityList)
router.get('/:id', cityController.getCityDetails)
router.post('/', cityValidator.addCityValidator(), cityController.addCity)



module.exports = router;