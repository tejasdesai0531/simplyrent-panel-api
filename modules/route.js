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
const productRouter = require('./products/products.route');
const productCityMapping = require('./product_city_mapping/product_city_mapping.route')
const productInterval = require('./product_interval/product_interval.route')
const productIntervalMapping = require('./product_interval_mapping/product_interval_mapping.route')
const { route } = require('./city/city.route');

router.use('/auth', authRouter)
router.use('/city', authCheck, cityRouter)
router.use('/banner', authCheck, bannerRouter)
router.use('/category', authCheck, categoryRouter)
router.use('/sub_category', authCheck, subCategoryRouter)
router.use('/category_city_mapping', authCheck, categoryCityMapping)
router.use('/sub_category_city_mapping', authCheck, subCategoryCityMapping)
router.use('/products', productRouter)
router.use('/product_city_mapping', productCityMapping)
router.use('/product_interval', productInterval)
router.use('/product_interval_mapping', productIntervalMapping)

module.exports = router; 
