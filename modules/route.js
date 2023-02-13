var express = require('express');
var router = express.Router();
var cors = require('cors')


const cityRouter = require('./city/city.route')
const authRouter = require('./auth/auth.route')
const bannerRouter = require('./banner/banner.route')


router.use('/auth', authRouter)
router.use('/city', cityRouter)
router.use('/banner', bannerRouter)


module.exports = router;
