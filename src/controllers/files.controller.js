const fs = require('node:fs')
const { getFolderConstruct } = require('../services/files.services')

const getFiles = (req, res) => {
    const actualPath = `./projects/${req.params.projectId}/src/app.jsx`
    if(fs.existsSync(actualPath)) {
        const content = fs.readFileSync(actualPath, 'utf-8')
        res.status(201).send({
            [actualPath]: content
        })
    }
}

const createFolder = (req, res) => {
    // requires folder array to create a folder in nth level
    // require folder name
    const filePath = req.body?.filePath.join("/")
    console.log("filePath", filePath)
    const actualPath = `./projects/${req.params?.projectId}/${filePath}/${req.body.folderName}`
    console.log("actualPath", actualPath)
    
    try {
        if(!fs.existsSync(actualPath)) {
            fs.mkdirSync(actualPath, { recursive: true })
            res.status(200).send({
                message: "Folder created"
            })
        } else {
            res.status(304).send({
                message: "Folder already exists"
            })
        }
    } catch(e) {
        console.log(e.message);
    }

}

const createFile = (req, res) => {
    // require folder array to create a file in nth level
    // require file name
    const filePath = req.body?.filePath.join("/")
    console.log("filePath", filePath)
    const actualPath = `./projects/${req.params?.projectId}/${filePath}/${req.body.fileName}`
    console.log("actualPath", actualPath)
    
        if(!fs.existsSync(actualPath)) {
            fs.writeFileSync(actualPath, '')
            res.status(200).send({
                message: "File created"
            })
        } else {
            res.status(304).send({
                message: "File already exists"
            })
        }
    } 

const getApplicationConstruct = async (req, res) => {
    const construct = {}
    getFolderConstruct(construct, `./projects/${req.params.projectId}`)
    res.status(200).send(construct)
}

module.exports = {
    createFile,
    createFolder,
    getFiles,
    getApplicationConstruct
}
