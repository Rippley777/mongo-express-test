const Interview = require("./model");

// @desc    Get all Interviews
exports.getInterviews = async (req, res) => {
  try {
    const Interviews = await Interview.find();
    res.json(Interviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create new Interview
exports.createInterview = async (req, res) => {
  const { title, id, userId, company, description, date, email } = req.body;
  try {
    const newInterview = new Interview({
      title,
      id,
      userId,
      company,
      description,
      date,
      email,
    });
    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

// @desc    Update Interview
exports.updateInterview = async (req, res) => {
  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedInterview);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

// @desc    Delete Interview
exports.deleteInterview = async (req, res) => {
  try {
    await Interview.findByIdAndDelete(req.params.id);
    res.json({ message: "Interview deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
