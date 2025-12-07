import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const stmt = db.prepare('DELETE FROM announcements WHERE id = ?');
            const info = stmt.run(id);

            if (info.changes === 0) {
                return res.status(404).json({ message: 'Announcement not found' });
            }
            return res.status(200).json({ message: 'Announcement deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Database error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
