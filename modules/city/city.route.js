const express = require('express')
const router = express.Router()
const cityController = require('./city.controller')

router.get('/', cityController.getCityList)
router.get('/:id', cityController.getCityDetails)
router.post('/', cityController.addCity)



module.exports = router;