const express = require('express')
const router = express.Router()
const bannerController = require('./banner.controller')

router.get('/', bannerController.getBannerList)
router.get('/:id', bannerController.getBanner)
router.post('/', bannerController.addBanner)
// router.put('/:id', addBannerValidators, bannerController.editBanner)



module.exports = router;