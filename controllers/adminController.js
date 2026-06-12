const db = require("../config/db");

// Approve bed request
exports.approveBed = async (req, res) => {
  const { id } = req.params;

  await db.query(
    "UPDATE bed_requests SET status='approved' WHERE id=?",
    [id]
  );

  res.json({ message: "Request approved" });
};

// Reject
exports.rejectBed = async (req, res) => {
  const { id } = req.params;

  await db.query(
    "UPDATE bed_requests SET status='rejected' WHERE id=?",
    [id]
  );

  res.json({ message: "Request rejected" });
};

// View all requests
exports.getRequests = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM bed_requests");
  res.json(rows);
};