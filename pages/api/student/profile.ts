import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Missing student ID' });

    const student = db.prepare('SELECT id, name, email, roll_number FROM students WHERE id = ?').get(id);

    if (!student) return res.status(404).json({ message: 'Student not found' });

    return res.status(200).json(student);
}
