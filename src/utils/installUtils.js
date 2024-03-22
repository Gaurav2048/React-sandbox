const child_process = require('child_process');
const esbuild = require('esbuild')

const installPackage = (name) => {
    child_process.execSync(`npm install ${name}`,{stdio:[0,1,2]});
}

const buildProject = async (path, entryPoint, outPutPoint) => {
    await esbuild.build({
        entryPoints: [`${path}/${entryPoint}`],
        bundle: true,
        jsx: "transform",
        outdir: `${path}/${outPutPoint}`
    })
}

module.exports = {
    installPackage,
    buildProject
}