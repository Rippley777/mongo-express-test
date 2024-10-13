const bcrypt = require("bcrypt");
// const chalk = require("chalk");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log("/register", { username, email, password });
  if (!username || !email || !password) {
    return res.status(400).send("Missing required fields");
  }
  if (username.indexOf("@") > -1) {
    return res.status(400).send("Username cannot contain '@'");
  }
  //   console.log(chalk.yellow("Registering user:", username));
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      dateCreated: new Date(),
      lastLogin: new Date(),
    });
    await newUser.save();
    // console.log(chalk.green("User registered successfully:", username));
    res.status(201).send("User registered successfully");
  } catch (err) {
    // console.error("Error registering user:", err);
    // Check for duplicate username or email
    if (err.code === 11000) {
      if (err.keyPattern.username) {
        return res.status(403).send("Username already exists");
      } else if (err.keyPattern.email) {
        return res.status(403).send("Email already exists");
      }
      return res.status(500).send("Unknown error registering user");
    }
    res.status(500).send("Error registering user");
  }
};

module.exports = {
  register,
};
