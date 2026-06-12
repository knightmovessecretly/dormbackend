const db = require("../config/db");
const slugify = require("slugify");

exports.createNews = async (req, res) => {
  console.log("---------------------------");
  console.log(req.body);
  try {
        const {
            title,
            summary,
            content,
            category,
            author,
            status
        } = req.body;

        const featured_image = req.file
            ? `/uploads/news/${req.file.filename}`
            : null;


      const slug =
          slugify(title, {
              lower: true,
              strict: true
          }) +
          "-" +
          Date.now();        

        const [result] = await db.execute(
            `INSERT INTO news
            (
                title,
                slug,
                summary,
                content,
                featured_image,
                category,
                author,
                status,
                published_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                slug,
                summary,
                content,
                featured_image,
                category,
                author,
                status,
                status === "published"
                    ? new Date()
                    : null
            ]
        );

        res.status(201).json({
            success: true,
            id: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        console.log("---------------------------------------");
        const [rows] = await db.execute(`
            SELECT *
            FROM news
            WHERE status='published'
            ORDER BY published_at DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getNewsBySlug = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM news WHERE slug=?",
            [req.params.slug]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            summary,
            content,
            category,
            author,
            status
        } = req.body;

        const [existing] = await db.execute(
            "SELECT featured_image FROM news WHERE id=?",
            [id]
        );

        if (!existing.length) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        const featured_image = req.file
            ? `/uploads/news/${req.file.filename}`
            : existing[0].featured_image;



    const [existingNews] = await db.execute(
        "SELECT slug, published_at FROM news WHERE id=?",
        [id]
    );

    const slug =
        title
            ? slugify(title, {
                lower: true,
                strict: true,
            })
            : existingNews[0].slug;


        
        await db.execute(
            `UPDATE news
             SET
                title=?,
                slug=?,
                summary=?,
                content=?,
                featured_image=?,
                category=?,
                author=?,
                status=?,
                published_at=?
             WHERE id=?`,
            [
                title,
                slug,
                summary,
                content,
                featured_image,
                category,
                author,
                status,
                status === "published"
                    ? new Date()
                    : null,
                id
            ]
        );

        res.json({
            success: true,
            message: "News updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            summary,
            content,
            category,
            author,
            status
        } = req.body;

        const [rows] = await db.execute(
            "SELECT * FROM news WHERE id=?",
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        const existing = rows[0];

        const featured_image = req.file
            ? `/uploads/news/${req.file.filename}`
            : existing.featured_image;

        const slug = title
            ? slugify(title, {
                  lower: true,
                  strict: true
              })
            : existing.slug;

        let publishedAt = existing.published_at;

        if (
            status === "published" &&
            !existing.published_at
        ) {
            publishedAt = new Date();
        }

        if (status !== "published") {
            publishedAt = null;
        }

        await db.execute(
            `UPDATE news
             SET
                title=?,
                slug=?,
                summary=?,
                content=?,
                featured_image=?,
                category=?,
                author=?,
                status=?,
                published_at=?
             WHERE id=?`,
            [
                title,
                slug,
                summary,
                content,
                featured_image,
                category,
                author,
                status,
                publishedAt,
                id
            ]
        );

        res.json({
            success: true,
            message: "News updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM news WHERE id=?",
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM news WHERE id=?",
            [id]
        );

        if (!result.affectedRows) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        res.json({
            success: true,
            message: "News deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};