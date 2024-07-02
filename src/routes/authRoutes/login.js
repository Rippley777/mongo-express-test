const express = require("express");
const { login } = require("../../controllers/loginController");

const router = express.Router();

router.post("/", login);

module.exports = router;

// old login route
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     console.log(chalk.yellow("Logging in user:", username));
//     const user = users.find((u) => u.username === username);
//     if (!user) {
//       console.log(chalk.red("User not found:", username));
//       return res.status(401).send("Invalid credentials");
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.log(chalk.red("Invalid password:", username));
//       return res.status(401).send("Invalid credentials");
//     }
//     const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRATION,
//     });
//     console.log(chalk.green("User logged in successfully:", username));
//     res.json({ token });
//   });
