import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const announcements = db.prepare('SELECT * FROM announcements ORDER BY date DESC').all();
        return res.status(200).json(announcements);
    }

    if (req.method === 'POST') {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and Content are required' });
        }

        const date = new Date().toISOString().split('T')[0];

        try {
            const stmt = db.prepare('INSERT INTO announcements (title, content, date) VALUES (?, ?, ?)');
            const info = stmt.run(title, content, date);
            return res.status(201).json({ id: info.lastInsertRowid, title, content, date });
        } catch (error) {
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
