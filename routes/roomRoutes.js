const express = require("express");
const router = express.Router();
const { 
  getRooms, 
  getRoomById, 
  updateOccupiedBeds, 
  getRoomTypeAvailability 
} = require("../controllers/roomController"); // Adjust path to your controller

// GET all rooms -> matches /api/rooms
router.get("/", getRooms);

// GET room availability grouped by type -> matches /api/rooms/availability
router.get("/availability", getRoomTypeAvailability);

// GET single room -> matches /api/rooms/:id
router.get("/:id", getRoomById);

// 🔍 CRITICAL FIX: Ensure this parameter is exactly ":id" and uses PUT
// This matches your frontend call: /api/rooms/:id
router.put("/:id", updateOccupiedBeds);

module.exports = router;