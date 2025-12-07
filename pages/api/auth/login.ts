import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    if (role === 'admin') {
        const admin = db.prepare('SELECT * FROM admins WHERE username = ? AND password = ?').get(username, password);
        if (admin) {
            return res.status(200).json({ user: { id: admin.id, name: 'Administrator', role: 'admin' } });
        }
    } else if (role === 'student') {
        const student = db.prepare('SELECT * FROM students WHERE email = ? AND password = ?').get(username, password);
        if (student) {
            return res.status(200).json({ user: { id: student.id, name: student.name, role: 'student' } });
        }
    }

    return res.status(401).json({ message: 'Invalid credentials' });
}
