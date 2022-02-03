// Imports
const express = require("express");
require("dotenv").config();

// Constants
const PORT = process.env.PORT || 8000;

// Setup server
const app = express();
app.use(express.json());

// // Endpoints
// // GET
// app.get("/users")

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
