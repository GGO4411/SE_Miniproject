// This file is just a working example for the rest of the team: it shows
// the pattern to follow when you add your own routes (events, registrations,
// payments, notifications). Feel free to delete this file once your real
// routes exist, or keep it around as a reference.

const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// Any logged-in user (any role) can hit this:
router.get("/ping", authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, your role is ${req.user.role}` });
});

// Only Organizers and Admins can hit this, e.g. for creating an event:
router.get("/organizer-only", authenticate, authorize("ORGANIZER", "ADMIN"), (req, res) => {
  res.json({ message: "You are allowed to manage events." });
});

// Only Admins can hit this, e.g. for the admin dashboard:
router.get("/admin-only", authenticate, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Welcome, Admin." });
});

module.exports = router;
