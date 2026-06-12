const router = require("express").Router();
const admin = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator endpoints
 */

/**
 * @swagger
 * /api/admin/requests:
 *   get:
 *     summary: Get all bed reservation requests
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reservation requests
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get("/requests", auth, isAdmin, admin.getRequests);

/**
 * @swagger
 * /api/admin/approve/{id}:
 *   put:
 *     summary: Approve a bed reservation request
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reservation request ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation approved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Request not found
 */
router.put("/approve/:id", auth, isAdmin, admin.approveBed);

/**
 * @swagger
 * /api/admin/reject/{id}:
 *   put:
 *     summary: Reject a bed reservation request
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reservation request ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation rejected successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Request not found
 */
router.put("/reject/:id", auth, isAdmin, admin.rejectBed);

module.exports = router;