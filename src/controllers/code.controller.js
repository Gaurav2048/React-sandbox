const fs = require('node:fs')
const { v4: uuidV4 } = require('uuid')
const { addProject } = require('../services/storage.services')

const getJsBundle = (req, res) => {

}

const createProject = (req, res) => {
    const projectName = req.body.projectName
    const projectId = uuidV4()

    const sourceLocation = `./projects/model_project_react`
    const destinationLocation = `./projects/${projectId}`
    fs.cpSync(sourceLocation, destinationLocation, { recursive: true })
    addProject(projectId, projectName)
    res.status(200).send({
        message: "Project created",
        projectName,
        projectId
    })
}

module.exports = {
    getJsBundle,
    createProject
}