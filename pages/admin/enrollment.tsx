import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function Enrollment() {
    const [students, setStudents] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [studentsRes, subjectsRes, enrollmentsRes] = await Promise.all([
            fetch('/api/admin/students'),
            fetch('/api/admin/subjects'),
            fetch('/api/admin/enrollment')
        ]);

        setStudents(await studentsRes.json());
        setSubjects(await subjectsRes.json());
        setEnrollments(await enrollmentsRes.json());
    };

    const handleEnroll = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        const res = await fetch('/api/admin/enrollment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: selectedStudent, subject_id: selectedSubject }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage('Enrolled successfully');
            fetchData(); // Refresh list
        } else {
            setMessage(data.message || 'Failed to enroll');
        }
    };

    const handleUnenroll = async (studentId: number, subjectId: number) => {
        if (!confirm('Are you sure you want to unenroll this student?')) return;

        const res = await fetch(`/api/admin/enrollment/delete?student_id=${studentId}&subject_id=${subjectId}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            fetchData();
        } else {
            alert('Failed to unenroll');
        }
    };

    return (
        <Layout role="admin">
            <Head>
                <title>Enrollment - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>Subject Enrollment</h2>
                <p>Manage student course enrollments.</p>
            </div>

            <div className="card mb-8">
                <h3 className="mb-4">Assign Subject to Student</h3>
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
                <form onSubmit={handleEnroll} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Student</label>
                        <select
                            className="input-field"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            required
                        >
                            <option value="">Select Student</option>
                            {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.roll_number})</option>)}
                        </select>
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Subject</label>
                        <select
                            className="input-field"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '46px' }}>Enroll</button>
                </form>
            </div>

            <div className="card">
                <h3>Current Enrollments</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Roll No</th>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((e, idx) => (
                            <tr key={idx}>
                                <td>{e.student_name}</td>
                                <td>{e.roll_number}</td>
                                <td>{e.subject_name}</td>
                                <td>{e.subject_code}</td>
                                <td>
                                    <button
                                        onClick={() => handleUnenroll(e.student_id, e.subject_id)}
                                        className="btn btn-danger"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                    >
                                        Unenroll
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
