const express = require('express')
const { getFiles, createFolder, createFile, getApplicationConstruct, updateFile, getBuild, getJavaScript } = require('../controllers/files.controller')

const filesRouter = express.Router()

filesRouter.get('/project/:projectId', getFiles)
filesRouter.post('/create/:projectId/folder', createFolder)
filesRouter.post('/create/:projectId/file', createFile)
filesRouter.get('/project/:projectId/build', getBuild)
filesRouter.get('/project/:projectId/:js', getJavaScript)
filesRouter.get('/construct/:projectId', getApplicationConstruct)
filesRouter.put('/project/:projectId', updateFile)

module.exports = filesRouter