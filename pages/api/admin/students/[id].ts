import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        const { name, email, roll_number } = req.body;
        // Password update is optional or separate usually, but for simplicity let's skip it here or make it optional
        // If password is provided, update it.

        try {
            const stmt = db.prepare('UPDATE students SET name = ?, email = ?, roll_number = ? WHERE id = ?');
            const info = stmt.run(name, email, roll_number, id);

            if (info.changes === 0) {
                return res.status(404).json({ message: 'Student not found' });
            }
            return res.status(200).json({ message: 'Student updated' });
        } catch (error: any) {
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                return res.status(409).json({ message: 'Email or Roll Number already exists' });
            }
            return res.status(500).json({ message: 'Database error' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const stmt = db.prepare('DELETE FROM students WHERE id = ?');
            const info = stmt.run(id);

            if (info.changes === 0) {
                return res.status(404).json({ message: 'Student not found' });
            }
            return res.status(200).json({ message: 'Student deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
