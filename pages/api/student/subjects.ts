import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Missing student ID' });

    const subjects = db.prepare(`
    SELECT s.id, s.name, s.code
    FROM subjects s
    JOIN student_subjects ss ON s.id = ss.subject_id
    WHERE ss.student_id = ?
  `).all(id);

    return res.status(200).json(subjects);
}
