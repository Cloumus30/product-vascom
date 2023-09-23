const express = require( 'express')
const web = require( '../routes/web.js')
const api = require( '../routes/api.js')

const router = express.Router();

router.use(web)
router.use('/api', api)

module.exports = router;