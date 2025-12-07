import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        if (!id) {
            return res.status(400).json({ message: 'Subject ID is required' });
        }

        try {
            const students = db.prepare(`
        SELECT s.id, s.name, s.email, s.roll_number
        FROM students s
        JOIN student_subjects ss ON s.id = ss.student_id
        WHERE ss.subject_id = ?
      `).all(id);

            return res.status(200).json(students);
        } catch (error) {
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
