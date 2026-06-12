const db = require("../config/db");

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const [rooms] = await db.query(`
      SELECT
        id,
        room_number,
        room_type,
        total_beds,
        occupied_beds,
        (total_beds - occupied_beds) AS available_beds
      FROM rooms
      ORDER BY room_number
    `);

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Get Rooms Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
};

// Update occupied beds
const updateOccupiedBeds = async (req, res) => {
  try {
    const { id } = req.params;
    const { occupied_beds } = req.body;

    const [room] = await db.query(
      "SELECT total_beds FROM rooms WHERE id = ?",
      [id]
    );

    if (room.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const totalBeds = room[0].total_beds;

    if (
      occupied_beds < 0 ||
      occupied_beds > totalBeds
    ) {
      return res.status(400).json({
        success: false,
        message: `Occupied beds must be between 0 and ${totalBeds}`,
      });
    }

    await db.query(
      `
      UPDATE rooms
      SET occupied_beds = ?
      WHERE id = ?
      `,
      [occupied_beds, id]
    );

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
    });
  } catch (error) {
    console.error("Update Room Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update room",
      error: error.message,
    });
  }
};

// Get single room
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const [room] = await db.query(
      `
      SELECT
        *,
        (total_beds - occupied_beds) AS available_beds
      FROM rooms
      WHERE id = ?
      `,
      [id]
    );

    if (room.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json(room[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch room",
    });
  }
};


// Get room availability grouped by room type
const getRoomTypeAvailability = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        room_type,
        SUM(total_beds - occupied_beds) AS available_beds
      FROM rooms
      GROUP BY room_type
      ORDER BY room_type
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Room Type Availability Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch room availability",
      error: error.message,
    });
  }
};


module.exports = {
  getRooms,
  getRoomById,
  updateOccupiedBeds,
  getRoomTypeAvailability,
};
