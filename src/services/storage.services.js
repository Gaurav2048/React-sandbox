const fs = require("node:fs");
const path = require("path");

const PROJECT_JSON_LOCATION = path.join(
  __dirname,
  "..",
  "storage",
  "project.json"
);

const addProject = async (projectId, projectName) => {
  const json = fs.readFileSync(PROJECT_JSON_LOCATION, "utf-8");
  console.log("result ", JSON.parse(json));
  const projects = JSON.parse(json);
  projects[projectId] = { name: projectName };
  fs.writeFileSync(PROJECT_JSON_LOCATION, JSON.stringify(projects), "utf-8");
};

module.exports = {
  addProject,
};
