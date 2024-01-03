require("dotenv").config();

const SERVER_CONFIG = {
  EXPOSE_PORT: process.env.EXPOSE_PORT || 5000,
};

module.exports = SERVER_CONFIG;
