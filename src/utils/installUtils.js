const child_process = require('child_process');

export const installPackage = (name) => {
    child_process.execSync(`npm install ${name}`,{stdio:[0,1,2]});
}