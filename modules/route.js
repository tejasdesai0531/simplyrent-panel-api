var express = require('express');
var router = express.Router();
var cors = require('cors')


const cityRouter = require('./city/city.route')
const authRouter = require('./auth/auth.route')
const bannerRouter = require('./banner/banner.route')
const categoryRouter = require('./category/category.route')
const subCategoryRouter = require('./sub_category/sub_category.route')


router.use('/auth', authRouter)
router.use('/city', cityRouter)
router.use('/banner', bannerRouter)
router.use('/category', categoryRouter)
router.use('/sub_category', subCategoryRouter)


module.exports = router;
