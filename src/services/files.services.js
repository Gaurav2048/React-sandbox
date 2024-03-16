const fs = require("node:fs")

const getFolderConstruct = (obj, root) => {
    
    const res = fs.readdirSync(root)
    
    res.forEach(loc => {
        if (isFolder(root, loc)) {
            obj[loc] = {}
            getFolderConstruct(obj[loc], `${root}/${loc}`)
        } else {
            obj[loc] = ""
        }
    })
}

const isFolder = (rootDir, location) => {
    return fs.statSync(`${rootDir}/${location}`).isDirectory()
}

// getFolderConstruct(construct, './projects/b9dd4ad5-5723-4bf0-bc42-944a5494348f')
// console.log(JSON.stringify(construct))

// process.nextTick(() => {
// })

module.exports = {
    getFolderConstruct
}