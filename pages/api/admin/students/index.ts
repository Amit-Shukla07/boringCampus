import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const students = db.prepare('SELECT id, name, email, roll_number FROM students').all();
        return res.status(200).json(students);
    }

    if (req.method === 'POST') {
        const { name, email, password, roll_number } = req.body;
        if (!name || !email || !password || !roll_number) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const stmt = db.prepare('INSERT INTO students (name, email, password, roll_number) VALUES (?, ?, ?, ?)');
            const info = stmt.run(name, email, password, roll_number);
            return res.status(201).json({ id: info.lastInsertRowid, name, email, roll_number });
        } catch (error: any) {
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                return res.status(409).json({ message: 'Email or Roll Number already exists' });
            }
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
