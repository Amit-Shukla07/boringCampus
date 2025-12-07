import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function StudentAttendance() {
    const [attendance, setAttendance] = useState<any[]>([]);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            fetchAttendance(user.id);
        }
    }, []);

    const fetchAttendance = async (id: number) => {
        const res = await fetch(`/api/student/attendance?id=${id}`);
        const data = await res.json();
        setAttendance(data);
    };

    // Calculate percentage
    const totalClasses = attendance.length;
    const presentClasses = attendance.filter(a => a.status === 'present').length;
    const percentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(2) : 0;

    return (
        <Layout role="student">
            <Head>
                <title>My Attendance - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>My Attendance</h2>
                <p>Track your daily attendance record.</p>
            </div>

            <div className="card">
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ marginBottom: '0.25rem', fontSize: '1rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Attendance</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: Number(percentage) < 75 ? 'var(--error-color)' : 'var(--success-color)' }}>
                            {percentage}%
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>Total Classes: <strong>{totalClasses}</strong></div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>Present: <strong>{presentClasses}</strong></div>
                    </div>
                </div>

                <h3>Attendance History</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Subject</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((record) => (
                            <tr key={record.id}>
                                <td>{record.date}</td>
                                <td>{record.subject_name} ({record.subject_code})</td>
                                <td>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '999px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        backgroundColor: record.status === 'present' ? '#d1fae5' : '#fee2e2',
                                        color: record.status === 'present' ? '#065f46' : '#991b1b'
                                    }}>
                                        {record.status === 'present' ? 'Present' : 'Absent'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
