import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function StudentAnnouncements() {
    const [announcements, setAnnouncements] = useState<any[]>([]);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const res = await fetch('/api/student/announcements');
        const data = await res.json();
        setAnnouncements(data);
    };

    return (
        <Layout role="student">
            <Head>
                <title>Announcements - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>Announcements</h2>
                <p>Stay updated with the latest news from school.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {announcements.length === 0 && (
                    <div className="card text-center" style={{ padding: '3rem' }}>
                        <p style={{ color: 'var(--slate-500)' }}>No announcements yet.</p>
                    </div>
                )}
                {announcements.map((announcement) => (
                    <div key={announcement.id} className="card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{announcement.title}</h3>
                            <span style={{ fontSize: '0.875rem', color: 'var(--slate-400)', backgroundColor: 'var(--slate-50)', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                                {announcement.date}
                            </span>
                        </div>
                        <p style={{ margin: 0, color: 'var(--slate-600)', lineHeight: '1.6' }}>{announcement.content}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
