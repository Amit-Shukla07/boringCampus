import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Missing student ID' });

    const marks = db.prepare(`
    SELECT m.*, s.name as subject_name, s.code as subject_code
    FROM marks m
    JOIN subjects s ON m.subject_id = s.id
    WHERE m.student_id = ?
    ORDER BY s.name, m.exam_type
  `).all(id);

    return res.status(200).json(marks);
}
