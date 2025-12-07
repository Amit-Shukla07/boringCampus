import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { student_id, subject_id } = req.query;

    if (req.method === 'DELETE') {
        if (!student_id || !subject_id) {
            return res.status(400).json({ message: 'Missing parameters' });
        }

        try {
            const stmt = db.prepare('DELETE FROM student_subjects WHERE student_id = ? AND subject_id = ?');
            const info = stmt.run(student_id, subject_id);

            if (info.changes === 0) {
                return res.status(404).json({ message: 'Enrollment not found' });
            }
            return res.status(200).json({ message: 'Unenrolled successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
