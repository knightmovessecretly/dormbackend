const router = require("express").Router();
const room = require("../controllers/roomController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         room_number:
 *           type: string
 *           example: "101"
 *         room_type:
 *           type: string
 *           example: "Deluxe"
 *         total_beds:
 *           type: integer
 *           example: 4
 *         occupied_beds:
 *           type: integer
 *           example: 2
 *         available_beds:
 *           type: integer
 *           example: 2
 *
 *     RoomAvailability:
 *       type: object
 *       properties:
 *         room_type:
 *           type: string
 *           example: "Deluxe"
 *         total_rooms:
 *           type: integer
 *           example: 10
 *         available_rooms:
 *           type: integer
 *           example: 4
 *
 *     UpdateOccupiedBedsRequest:
 *       type: object
 *       required:
 *         - occupied_beds
 *       properties:
 *         occupied_beds:
 *           type: integer
 *           example: 3
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Occupied beds updated"
 */

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management endpoints
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.get("/", room.getRooms);

/**
 * @swagger
 * /api/rooms/availability/type:
 *   get:
 *     summary: Get room availability grouped by room type
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Room availability retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomAvailability'
 */
router.get("/availability/type", room.getRoomTypeAvailability);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Room ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Room retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 */
router.get("/:id", room.getRoomById);

/**
 * @swagger
 * /api/rooms/{id}/occupied:
 *   put:
 *     summary: Update occupied beds in a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Room ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOccupiedBedsRequest'
 *     responses:
 *       200:
 *         description: Occupied beds updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid occupied beds value
 *       404:
 *         description: Room not found
 */
router.put("/:id/occupied", room.updateOccupiedBeds);

module.exports = router;
