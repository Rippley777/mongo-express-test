const User = require("../models/User");

const addUserIfNotExists = async (userData) => {
  const { username, email } = userData;

  //   const userExists = await User.findOne({ $or: [{ email }, { username }] });
  const userExists = await User.findOne({ email });
  if (userExists) {
    return { success: false, message: "User already exists!" };
  }

  const newUser = new User({ username, email, dateCreated: new Date() });
  await newUser.save();

  return { success: true, message: "User added successfully!", user: newUser };
};

/**
 * Updates the username for a specific user identified by email.
 * @param {string} userEmail The email of the user to update.
 * @param {string} newUsername The new username to set.
 * @returns {Promise<Object>} The result of the update operation.
 */
const updateUsernameByEmail = async (userEmail, newUsername) => {
  try {
    // First, check if the new username is already taken by someone else
    const usernameExists = await User.findOne({ username: newUsername });
    if (usernameExists) {
      throw new Error("Username already taken");
    }

    // Find the user by email and update their username
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { username: newUsername },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("User not found with the provided email");
    }

    return {
      success: true,
      data: updatedUser,
      message: "Username updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  addUserIfNotExists,
  updateUsernameByEmail,
};
