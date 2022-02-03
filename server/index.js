// Imports
const express = require("express");
const cors = require("cors");
const { getUsers, getUser } = require("./utils/file");
require("dotenv").config();

// Constants
const PORT = process.env.PORT || 8000;

// Setup server
const app = express();
app.use(express.json());
app.use(cors());

// Endpoints
// GET
app.get("/users", getUsers);
app.get("/users/:id", getUser);

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
