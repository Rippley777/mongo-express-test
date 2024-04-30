const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 11);
};

module.exports = generateUniqueId;
