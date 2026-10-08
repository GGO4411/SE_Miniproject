const express = require("express");

const {
  createEvent,
  listPublicEvents,
  getPublicEvent,
  listMyEvents,
  updateEvent,
  publishEvent,
  cancelEvent,
} = require("../controllers/eventController");

const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// Public event routes
router.get("/", listPublicEvents);

// Organizer/Admin management routes
// IMPORTANT: keep this above "/:id"
router.get(
  "/manage/mine",
  authenticate,
  authorize("ORGANIZER", "ADMIN"),
  listMyEvents
);

router.post(
  "/",
  authenticate,
  authorize("ORGANIZER", "ADMIN"),
  createEvent
);

router.put(
  "/:id",
  authenticate,
  authorize("ORGANIZER", "ADMIN"),
  updateEvent
);

router.post(
  "/:id/publish",
  authenticate,
  authorize("ORGANIZER", "ADMIN"),
  publishEvent
);

router.post(
  "/:id/cancel",
  authenticate,
  authorize("ORGANIZER", "ADMIN"),
  cancelEvent
);

// Keep dynamic public route LAST
router.get("/:id", getPublicEvent);

module.exports = router;