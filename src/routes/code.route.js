const express = require("express");
const {
  getJsBundle,
  createProject,
} = require("../controllers/code.controller");

const codeRouter = express.Router();

codeRouter.get("/build/:project-id", getJsBundle);
codeRouter.post("/create-project", createProject);

module.exports = codeRouter;
