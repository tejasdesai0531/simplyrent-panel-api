var express = require('express');
var router = express.Router();
var cors = require('cors')


const cityRouter = require('./city/city.route')
const authRouter = require('./auth/auth.route')
const authCheck = require('../middlewares/auth.middleware')
const bannerRouter = require('./banner/banner.route')
const categoryRouter = require('./category/category.route')
const subCategoryRouter = require('./sub_category/sub_category.route')
const categoryCityMapping = require('./category city mapping/category_city_mapping.route')
const subCategoryCityMapping = require('./sub_category city mapping/sub_category_city_mapping.route')

router.use('/auth', authRouter)
router.use('/city', authCheck, cityRouter)
router.use('/banner', authCheck, bannerRouter)
router.use('/category', authCheck, categoryRouter)
router.use('/sub_category', authCheck, subCategoryRouter)
router.use('/category_city_mapping', authCheck, categoryCityMapping)
router.use('/sub_category_city_mapping', authCheck, subCategoryCityMapping)

module.exports = router;
