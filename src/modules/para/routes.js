const express = require("express");
const {
  getProjects,
  createProject,
} = require("./controllers/paraProjectController");
const router = express.Router();

router.get("/projects", getProjects);

router.post("/projects", createProject);

module.exports = router;
