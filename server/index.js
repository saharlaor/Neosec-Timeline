// Imports
const express = require("express");
const { getUsers, getUser } = require("./utils/file");
require("dotenv").config();

// Constants
const PORT = process.env.PORT || 8000;

// Setup server
const app = express();
app.use(express.json());

// Endpoints
// GET
app.get("/users", getUsers);
app.get("/users/:id", getUser);

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
