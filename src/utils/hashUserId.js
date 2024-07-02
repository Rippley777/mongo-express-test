const crypto = require("crypto");

const hashUserId = (userId) => {
  return crypto.createHash("sha256").update(userId).digest("hex");
};

module.exports = {
  hashUserId,
};
