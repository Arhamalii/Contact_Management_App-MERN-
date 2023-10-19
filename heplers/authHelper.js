const bcrypt = require("bcryptjs");

module.exports = {
  hasPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hasedPassword = await bcrypt.hash(password, salt);
      return hasedPassword;
    } catch (error) {
      console.log(error);
    }
  },

  comparePassword: async (password, hashedPasswords) => {
    return bcrypt.compare(password, hashedPasswords);
  },
};
