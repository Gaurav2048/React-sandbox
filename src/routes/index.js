const express = require('express')
const filesRouter = require('./files.route')
const codeRouter = require('./code.route')

const router = express.Router()

router.use('/file', filesRouter)
router.use('/code', codeRouter)

module.exports = router;
