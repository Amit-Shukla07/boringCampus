import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { subject_id, exam_type } = req.query;

        if (subject_id && exam_type) {
            const marks = db.prepare(`
         SELECT m.*, s.name as student_name, s.roll_number 
         FROM marks m 
         JOIN students s ON m.student_id = s.id 
         WHERE m.subject_id = ? AND m.exam_type = ?
       `).all(subject_id, exam_type);
            return res.status(200).json(marks);
        }

        return res.status(200).json([]);
    }

    if (req.method === 'POST') {
        const { subject_id, exam_type, max_marks, records } = req.body; // records: [{ student_id, marks_obtained }]

        if (!subject_id || !exam_type || !max_marks || !records) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const insert = db.prepare('INSERT INTO marks (student_id, subject_id, marks_obtained, max_marks, exam_type) VALUES (?, ?, ?, ?, ?)');
        const update = db.prepare('UPDATE marks SET marks_obtained = ?, max_marks = ? WHERE id = ?');
        const check = db.prepare('SELECT id FROM marks WHERE student_id = ? AND subject_id = ? AND exam_type = ?');

        const transaction = db.transaction((records) => {
            for (const record of records) {
                const existing = check.get(record.student_id, subject_id, exam_type);
                if (existing) {
                    update.run(record.marks_obtained, max_marks, existing.id);
                } else {
                    insert.run(record.student_id, subject_id, record.marks_obtained, max_marks, exam_type);
                }
            }
        });

        try {
            transaction(records);
            return res.status(200).json({ message: 'Marks recorded' });
        } catch (error) {
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
