const fs = require('node:fs')
const { getFolderConstruct, getFolderContent } = require('../services/files.services')

const getFiles = (req, res) => {
    const actualPath = `./projects/${req.params.projectId}`
    const obj = {}
    getFolderContent(obj, actualPath, '')
    res.send(obj)  
    
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
