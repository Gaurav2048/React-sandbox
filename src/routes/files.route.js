const express = require('express')
const { getFiles, createFolder, createFile, getApplicationConstruct } = require('../controllers/files.controller')

const filesRouter = express.Router()

filesRouter.get('/project/:projectId', getFiles)
filesRouter.post('/create/:projectId/folder', createFolder)
filesRouter.post('/create/:projectId/file', createFile)
filesRouter.get('/project/:projectId/construct', getApplicationConstruct)

module.exports = filesRouter