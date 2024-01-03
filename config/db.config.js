require("dotenv").config();

const DB_CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI,
};
module.exports = DB_CONFIG;
