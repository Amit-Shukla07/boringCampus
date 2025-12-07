import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const subjects = db.prepare('SELECT * FROM subjects').all();
        return res.status(200).json(subjects);
    }

    if (req.method === 'POST') {
        const { name, code } = req.body;
        if (!name || !code) {
            return res.status(400).json({ message: 'Name and Code are required' });
        }

        try {
            const stmt = db.prepare('INSERT INTO subjects (name, code) VALUES (?, ?)');
            const info = stmt.run(name, code);
            return res.status(201).json({ id: info.lastInsertRowid, name, code });
        } catch (error: any) {
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                return res.status(409).json({ message: 'Subject Code already exists' });
            }
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
