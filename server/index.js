// Imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const { getUsers, getUser, deleteEvent } = require("./utils/file");
require("dotenv").config();

// Constants
const PORT = process.env.PORT || 8000;
const PUBLIC_PATH = path.join(__dirname, "../client/build");

// Setup server
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_PATH));

// Endpoints
// GET
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUser);

// DELETE
app.delete("/api/events/:id", deleteEvent);

// Fallback
app.get("*", (req, res) => {
  res.sendFile(path.resolve(PUBLIC_PATH, "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
