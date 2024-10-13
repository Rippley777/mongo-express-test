const bcrypt = require("bcrypt");
// const chalk = require("chalk");
const User = require("../../models/User");
const Guest = require("./model");

const register = async (req, res) => {
  const { email, role } = req.body;
  console.log("/register", { email });
  if (email.indexOf("@") == -1) {
    return res.status(400).send("Username must contain '@'");
  }
  //   console.log(chalk.yellow("Registering guest:", email));
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(403).send("User already exists");
    }

    const newGuest = new Guest({
      email,
      role: role || "guest",
      dateCreated: new Date(),
      lastLogin: new Date(),
    });
    await newGuest.save();
    // console.log(chalk.green("Guest registered successfully:", email));
    res.status(201).send("Guest registered successfully");
  } catch (err) {
    // console.error("Error registering guest:", err);
    if (err.code === 11000) {
      if (err.keyPattern.email) {
        return res.status(403).send("Email already exists");
      }
      return res.status(500).send("Unknown error registering guest");
    }
    res.status(500).send("Error registering guest");
  }
};

const retrieve = async (req, res) => {
  const { email } = req.body;
  console.log("/retrieve", { email });
  try {
    const user = await User.findOne({
      email,
    });
    const guest = await Guest.findOne({
      email,
    });
    if (!guest && !user) {
      return res.status(404).send("User not found");
    }
    // console.log("/retrieve (db results)", { guest });
    res.json({
      id: user ? user._id : guest._id,
      email: user ? user.email : guest.email,
      role: user ? user.role : guest.role,
    });
  } catch (error) {
    console.error("/retrieve (error) ", { error });
    res.status(500).send("Error retrieving user");
  }
};

module.exports = {
  register,
  retrieve,
};
