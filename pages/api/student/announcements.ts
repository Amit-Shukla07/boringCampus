import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const announcements = db.prepare('SELECT * FROM announcements ORDER BY date DESC').all();
    return res.status(200).json(announcements);
}
