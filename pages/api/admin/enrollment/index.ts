import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Get all enrollments with names
        const enrollments = db.prepare(`
      SELECT ss.student_id, ss.subject_id, st.name as student_name, st.roll_number, su.name as subject_name, su.code as subject_code
      FROM student_subjects ss
      JOIN students st ON ss.student_id = st.id
      JOIN subjects su ON ss.subject_id = su.id
    `).all();
        return res.status(200).json(enrollments);
    }

    if (req.method === 'POST') {
        const { student_id, subject_id } = req.body;
        if (!student_id || !subject_id) {
            return res.status(400).json({ message: 'Student and Subject are required' });
        }

        try {
            const stmt = db.prepare('INSERT INTO student_subjects (student_id, subject_id) VALUES (?, ?)');
            stmt.run(student_id, subject_id);
            return res.status(201).json({ message: 'Enrolled successfully' });
        } catch (error: any) {
            if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
                return res.status(409).json({ message: 'Student is already enrolled in this subject' });
            }
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
