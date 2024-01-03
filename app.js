const mongoose = require("mongoose");
const express = require("express");
const path = require('path');

const config = require("./config");
const routes = require("./routes")

const app = express();

app.use(express.json());

// Use the 'connected' event to wait for MongoDB connection
mongoose.connection.on('connected', () => {
  console.info('Connected to MongoDB');

  // Auth under /auth/register and /auth/login
  app.use('/', routes);

  // Presentation
  app.use(express.static(path.join(__dirname, 'public')));

  const port = config.serverConfig.EXPOSE_PORT;
  app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
    console.log(`Presentation is under http://localhost:${port}/demo.html`);
  });
});

mongoose.connect(config.dbConfig.MONGODB_URI)
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
