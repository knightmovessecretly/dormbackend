const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const newsController = require("../controllers/newsController");

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management APIs
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of news articles
 */
router.get("/", newsController.getAllNews);

/**
 * @swagger
 * /api/news/{slug}:
 *   get:
 *     summary: Get news by slug
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: News slug
 *     responses:
 *       200:
 *         description: News article details
 *       404:
 *         description: News not found
 */
router.get("/:slug", newsController.getNewsBySlug);

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create a news article
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               featured_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: News created successfully
 *       400:
 *         description: Invalid request
 */
router.post(
    "/",
    upload.single("featured_image"),
    newsController.createNews
);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Update a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: News ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               featured_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: News updated successfully
 *       404:
 *         description: News not found
 */
router.put(
    "/:id",
    upload.single("featured_image"),
    newsController.updateNews
);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Delete a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: News ID
 *     responses:
 *       200:
 *         description: News deleted successfully
 *       404:
 *         description: News not found
 */
router.delete("/:id", newsController.deleteNews);


router.get("/admin/:id", newsController.getNewsById);


module.exports = router;