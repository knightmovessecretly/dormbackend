const db = require("../config/db");

exports.getAvailableBeds = async (req, res) => {
    try {

        const [beds] = await db.query(`
            SELECT
                r.room_number,
                r.room_type,
                b.bed_number
            FROM beds b
            JOIN rooms r ON b.room_id = r.id
            WHERE b.is_occupied = FALSE
            AND NOT EXISTS (
                SELECT 1
                FROM bed_requests br
                WHERE br.room_number = r.room_number
                AND br.bed_number = b.bed_number
                AND br.status = 'approved'
            )
        `);

        res.json(beds);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

   
};

exports.createRequest = async (req, res) => {

    try {

        const { room_number, bed_number } = req.body;
        const user_id = req.user.id;

        const [existing] = await db.query(`
            SELECT *
            FROM bed_requests
            WHERE room_number = ?
            AND bed_number = ?
            AND status IN ('pending','approved')
        `, [room_number, bed_number]);

        if(existing.length > 0){
            return res.status(400).json({
                message: "Bed already requested or occupied."
            });
        }

        await db.query(`
            INSERT INTO bed_requests
            (user_id, room_number, bed_number)
            VALUES (?, ?, ?)
        `,[user_id, room_number, bed_number]);

        res.status(201).json({
            message: "Reservation request submitted."
        });

    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getMyRequests = async (req, res) => {

    try {

        const user_id = req.user.id;

        const [rows] = await db.query(`
            SELECT *
            FROM bed_requests
            WHERE user_id = ?
            ORDER BY created_at DESC
        `,[user_id]);

        res.json(rows);

    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};