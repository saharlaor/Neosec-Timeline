const {
  getUsers,
  getUser,
  deleteEvent,
} = require("../controllers/controllers");
const express = require("express");

const router = express.Router();

// Endpoints
// GET
router.get("/api/users", getUsers);
router.get("/api/users/:id", getUser);

// DELETE
router.delete("/api/events/:id", deleteEvent);

module.exports = router;
