const fs = require("node:fs");
const {
  getFolderConstruct,
  getFolderContent,
  rewriteFile,
} = require("../services/files.services");
const { buildProject } = require("../utils/installUtils");

const getFiles = (req, res) => {
  const actualPath = `./projects/${req.params.projectId}`;
  const obj = {};
  getFolderContent(obj, actualPath, "");
  res.send(obj);
};

const getBuild = async (req, res) => {
  const path = `./projects/${req?.params?.projectId}`;
  res.sendFile(`${path}/public/index.html`, { root: `${__dirname}/../../` });
};

const getJavaScript = async (req, res) => {
  const path = `./projects/${req?.params?.projectId}`;
  res.sendFile(`${path}/public/index.js`, { root: `${__dirname}/../../` });
};

const createFolder = (req, res) => {
  // requires folder array to create a folder in nth level
  // require folder name
  const filePath = req.body?.filePath.join("/");
  console.log("filePath", filePath);
  const actualPath = `./projects/${req.params?.projectId}/${filePath}/${req.body.folderName}`;
  console.log("actualPath", actualPath);

  try {
    if (!fs.existsSync(actualPath)) {
      fs.mkdirSync(actualPath, { recursive: true });
      res.status(200).send({
        message: "Folder created",
      });
    } else {
      res.status(304).send({
        message: "Folder already exists",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const createFile = (req, res) => {
  // require folder array to create a file in nth level
  // require file name
  const filePath = req.body?.filePath.join("/");
  console.log("filePath", filePath);
  const actualPath = `./projects/${req.params?.projectId}/${filePath}/${req.body.fileName}`;
  console.log("actualPath", actualPath);

  if (!fs.existsSync(actualPath)) {
    fs.writeFileSync(actualPath, "");
    res.status(200).send({
      message: "File created",
    });
  } else {
    res.status(304).send({
      message: "File already exists",
    });
  }
};

const getApplicationConstruct = async (req, res) => {
  const construct = {};
  getFolderConstruct(construct, `./projects/${req.params?.projectId}`);
  res.status(200).send(construct);
};

const updateFile = async (req, res) => {
  const fileLocation = `./projects/${req.params?.projectId}/${req.body?.filePath}`;
  const content = req.body?.content;
  rewriteFile(fileLocation, content);
  await fs.unlinkSync(`./projects/${req.params?.projectId}/public/index.js`);
  await buildProject(
    `./projects/${req.params?.projectId}`,
    "src/index.jsx",
    "public"
  );
  res?.status(200).send({
    message: "File updated",
    filePath: req.body.filePath,
    content,
  });
};

module.exports = {
  createFile,
  createFolder,
  getFiles,
  getJavaScript,
  getApplicationConstruct,
  getBuild,
  updateFile,
};
