import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Get attendance for a specific date and subject, or all
        const { date, subject_id } = req.query;

        if (date && subject_id) {
            const attendance = db.prepare(`
         SELECT a.*, s.name as student_name, s.roll_number 
         FROM attendance a 
         JOIN students s ON a.student_id = s.id 
         WHERE a.date = ? AND a.subject_id = ?
       `).all(date, subject_id);
            return res.status(200).json(attendance);
        }

        // If no filters, maybe return nothing or all (careful with volume)
        // For now, let's return empty if no filters to avoid loading everything
        return res.status(200).json([]);
    }

    if (req.method === 'POST') {
        const { subject_id, date, records } = req.body; // records: [{ student_id, status }]

        if (!subject_id || !date || !records) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const insert = db.prepare('INSERT INTO attendance (student_id, subject_id, date, status) VALUES (?, ?, ?, ?)');
        const update = db.prepare('UPDATE attendance SET status = ? WHERE id = ?');
        const check = db.prepare('SELECT id FROM attendance WHERE student_id = ? AND subject_id = ? AND date = ?');

        const transaction = db.transaction((records) => {
            for (const record of records) {
                const existing = check.get(record.student_id, subject_id, date);
                if (existing) {
                    update.run(record.status, existing.id);
                } else {
                    insert.run(record.student_id, subject_id, date, record.status);
                }
            }
        });

        try {
            transaction(records);
            return res.status(200).json({ message: 'Attendance recorded' });
        } catch (error) {
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
