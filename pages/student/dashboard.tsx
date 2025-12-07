import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

interface Student {
    id: number;
    name: string;
    email: string;
    roll_number: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

export default function StudentDashboard() {
    const [student, setStudent] = useState<Student | null>(null);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            fetchData(user.id);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchData = async (id: number) => {
        try {
            const [profileRes, subjectsRes] = await Promise.all([
                fetch(`/api/student/profile?id=${id}`),
                fetch(`/api/student/subjects?id=${id}`)
            ]);

            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setStudent(profileData);
            }
            if (subjectsRes.ok) {
                const subjectsData = await subjectsRes.json();
                setSubjects(subjectsData);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout role="student">
            <Head>
                <title>Student Dashboard - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2 style={{ marginBottom: '0.5rem' }}>My Dashboard</h2>
                <p>Welcome to your student portal.</p>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Student Details Card */}
                    {student && (
                        <div className="card">
                            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '0.5rem' }}>Student Details</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>Name</label>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>{student.name}</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>Roll Number</label>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>{student.roll_number}</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>Email</label>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>{student.email}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enrolled Subjects Card */}
                    <div className="card">
                        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '0.5rem' }}>Enrolled Subjects</h3>
                        {subjects.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                                {subjects.map((subject) => (
                                    <div key={subject.id} style={{
                                        padding: '1rem',
                                        backgroundColor: 'var(--gray-50)',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--gray-200)'
                                    }}>
                                        <div style={{ fontWeight: 600, color: 'var(--primary-700)', marginBottom: '0.25rem' }}>{subject.name}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Code: {subject.code}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--gray-500)', fontStyle: 'italic' }}>No subjects enrolled.</p>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
}
