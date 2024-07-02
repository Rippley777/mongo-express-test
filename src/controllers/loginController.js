const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const chalk = require("chalk");
const User = require("../models/User");
const { hashUserId } = require("../utils/hashUserId");
const { JWT_SECRET } = require("../utils/token");

const login = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("/login", { username, email, password });
  if (!password) {
    return res.status(400).send("Password is required");
  }
  if (!JWT_SECRET) {
    // console.log(chalk.red("JWT_SECRET env is not defined"));
    return res.status(500).send("JWT_SECRET is not defined");
  }
  try {
    if (!username && !email) {
      return res.status(400).send("Username or Email is required");
    }
    let user;
    if (username && username.indexOf("@") > -1) {
      user = await User.findOne({ email: username });
    } else if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    }
    if (!user) {
      //   console.log(chalk.red("User not found"));
      return res.status(404).send("User not found");
    }
    console.log("/login (db results)", { user });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    } else {
      await User.updateOne({ _id: user._id }, { lastLogin: new Date() });
    }
    const hashedUserId = hashUserId(user._id.toString());
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    res.json({
      id: hashedUserId,
      token,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error("/login (error) ", { error });
    res.status(500).send("Error logging in");
  }
};

module.exports = {
  login,
};
