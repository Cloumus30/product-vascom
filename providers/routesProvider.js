import express from 'express'
import web from '../routes/web.js'
import api from '../routes/api.js'

const router = express.Router();

router.use(web)
router.use('/api', api)

export default router;