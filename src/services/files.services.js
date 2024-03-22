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

const getFolderContent = (obj, root, path) => {
    const res = fs.readdirSync(`${root}${path ? `/${path}`: ''}`)
    
    res.forEach(loc => {
        if (isFolder(`${root}${path ? `/${path}`: ''}`, loc)) {
            getFolderContent(obj, root, `${path}/${loc}`)
        } else {
            obj[`${path}/${loc}`] = readFile(`${root}/${path}/${loc}`)
        }
    })
}

const readFile = (path) => {
    if(fs.existsSync(path)) {
        const content = fs.readFileSync(path, 'utf-8')
        return content
    }
}

const rewriteFile = (path, content) => {
    try {
        fs.writeFileSync(path, '')
        fs.writeFileSync(path, content)
        return 
    } catch (e) {
        console.log('from Update file', e.message);
    }
}

module.exports = {
    getFolderConstruct,
    getFolderContent,
    rewriteFile
}