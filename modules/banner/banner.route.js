const express = require('express')
const router = express.Router()
const bannerController = require('./banner.controller')

router.get('/', bannerController.getBannerList)
router.get('/:id', bannerController.getBanner)
router.post('/', bannerController.addBanner)



module.exports = router;