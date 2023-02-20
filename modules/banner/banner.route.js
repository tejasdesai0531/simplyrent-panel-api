const express = require('express')
const router = express.Router()
const upload = require('../../middlewares/upload-image')


const bannerController = require('./banner.controller')
const  {addBannerValidators, bannerListValidators} = require('./banner.validator')


router.get('/', bannerListValidators, bannerController.getBannerList)
router.get('/:id', bannerController.getBannerDetails)
router.post('/', addBannerValidators, bannerController.addBanner)
router.put('/:id',upload.single('image'), addBannerValidators, bannerController.editBanner)




module.exports = router;