import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Missing student ID' });

    const attendance = db.prepare(`
    SELECT a.*, s.name as subject_name, s.code as subject_code
    FROM attendance a
    JOIN subjects s ON a.subject_id = s.id
    WHERE a.student_id = ?
    ORDER BY a.date DESC
  `).all(id);

    return res.status(200).json(attendance);
}
