const Project = require("../models/Project");
const AuditLog = require("../../audit/models/AuditLog");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("areaId")
      .populate("resourceIds");
    res.status(200).json({ status: "success", data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description, tags, status, areaId, resourceIds } = req.body;
    const project = new Project({
      name,
      description,
      tags,
      status,
      areaId,
      resourceIds,
    });
    const savedProject = await project.save();

    // Log audit trail
    await AuditLog.create({
      entityType: "Project",
      entityId: savedProject._id,
      action: "CREATE",
      afterData: savedProject,
    });

    res.status(201).json({ status: "success", data: savedProject });
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
};
