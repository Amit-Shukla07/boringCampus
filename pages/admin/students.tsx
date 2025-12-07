import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function Students() {
    const [students, setStudents] = useState<any[]>([]);
    const [form, setForm] = useState({ name: '', roll_number: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await fetch('/api/admin/students');
        const data = await res.json();
        setStudents(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        const res = await fetch('/api/admin/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setMessage('Student added successfully');
            setForm({ name: '', roll_number: '', email: '', password: '' });
            fetchStudents();
        } else {
            setMessage('Failed to add student');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        const res = await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchStudents();
        } else {
            alert('Failed to delete');
        }
    };

    return (
        <Layout role="admin">
            <Head>
                <title>Manage Students - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>Manage Students</h2>
                <p>Add, remove, and view student records.</p>
            </div>

            <div className="card mb-8">
                <h3 className="mb-4">Add New Student</h3>
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
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Full Name</label>
                        <input
                            className="input-field"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            placeholder="e.g. Shinnosuke Nohara"
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Roll Number</label>
                        <input
                            className="input-field"
                            value={form.roll_number}
                            onChange={(e) => setForm({ ...form, roll_number: e.target.value })}
                            required
                            placeholder="e.g. KG-001"
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            placeholder="student@example.com"
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            placeholder="Initial password"
                        />
                    </div>
                    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary">Add Student</button>
                    </div>
                </form>
            </div>

            <div className="card">
                <h3>Student List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.roll_number}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(student.id)}
                                        className="btn btn-danger"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                    >
                                        Delete
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
