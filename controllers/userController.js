//const db = require("../config/db");
const bcrypt = require("bcrypt");
const db = require("../config/db");
// Get all users
exports.getUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, name, email, role, created_at FROM users"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [req.params.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }
    const { name, email, password, role } = req.body;
    console.log("-----------------------------------");
    console.log(req.body);

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [
        name,
        email,
        hashedPassword,
        role || "user",
      ]
    );

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
      [name, email, role, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};