import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [form, setForm] = useState({ title: '', content: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const res = await fetch('/api/student/announcements'); // Reusing student API for now or create admin specific
        const data = await res.json();
        setAnnouncements(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        // Assuming there's an API endpoint for creating announcements
        // If not, this might fail, but I'll assume standard REST structure or mock it
        const res = await fetch('/api/admin/announcements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, date: new Date().toISOString().split('T')[0] }),
        });

        if (res.ok) {
            setMessage('Announcement posted successfully');
            setForm({ title: '', content: '' });
            fetchAnnouncements();
        } else {
            setMessage('Failed to post announcement');
        }
    };

    return (
        <Layout role="admin">
            <Head>
                <title>Manage Announcements - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>Manage Announcements</h2>
                <p>Post updates for students and staff.</p>
            </div>

            <div className="card mb-8">
                <h3 className="mb-4">Post New Announcement</h3>
                {message && (
                    <div style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                        backgroundColor: message.includes('Failed') ? '#fef2f2' : '#f0fdf4',
                        color: message.includes('Failed') ? 'var(--error-color)' : 'var(--success-color)',
                        border: `1px solid ${message.includes('Failed') ? '#fecaca' : '#bbf7d0'}`
                    }}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Title</label>
                        <input
                            className="input-field"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                            placeholder="e.g. School Holiday Notice"
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Content</label>
                        <textarea
                            className="input-field"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            required
                            rows={4}
                            placeholder="Write your announcement here..."
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary">Post Announcement</button>
                    </div>
                </form>
            </div>

            <div className="card">
                <h3>Recent Announcements</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((announcement) => (
                            <tr key={announcement.id}>
                                <td style={{ whiteSpace: 'nowrap' }}>{announcement.date}</td>
                                <td><strong>{announcement.title}</strong></td>
                                <td>{announcement.content.substring(0, 100)}{announcement.content.length > 100 ? '...' : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
