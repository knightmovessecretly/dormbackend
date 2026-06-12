const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const bedRequest = require("../controllers/bedRequestController");

/**
 * @swagger
 * tags:
 *   name: Bed Requests
 *   description: Dormitory bed reservation requests
 */

/**
 * @swagger
 * /api/bed-requests/available:
 *   get:
 *     summary: Get all available beds
 *     tags: [Bed Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Available beds retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   room_number:
 *                     type: string
 *                     example: "101"
 *                   room_type:
 *                     type: string
 *                     enum: [solo, double, triple]
 *                     example: "double"
 *                   bed_number:
 *                     type: string
 *                     example: "Bed A"
 *       401:
 *         description: Unauthorized
 */
router.get("/available", auth, bedRequest.getAvailableBeds);

/**
 * @swagger
 * /api/bed-requests:
 *   post:
 *     summary: Create a bed reservation request
 *     tags: [Bed Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - room_number
 *               - bed_number
 *             properties:
 *               room_number:
 *                 type: string
 *                 example: "101"
 *               bed_number:
 *                 type: string
 *                 example: "Bed A"
 *     responses:
 *       201:
 *         description: Reservation request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reservation request submitted.
 *       400:
 *         description: Bed already requested or occupied
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, bedRequest.createRequest);

/**
 * @swagger
 * /api/bed-requests/my-requests:
 *   get:
 *     summary: Get current user's bed reservation requests
 *     tags: [Bed Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User reservation requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   room_number:
 *                     type: string
 *                     example: "101"
 *                   bed_number:
 *                     type: string
 *                     example: "Bed A"
 *                   status:
 *                     type: string
 *                     enum: [pending, approved, rejected]
 *                     example: "pending"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-31T10:30:00.000Z"
 *       401:
 *         description: Unauthorized
 */
router.get("/my-requests", auth, bedRequest.getMyRequests);

module.exports = router;
