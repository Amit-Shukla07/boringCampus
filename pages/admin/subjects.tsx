import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function Subjects() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [form, setForm] = useState({ name: '', code: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        const res = await fetch('/api/admin/subjects');
        const data = await res.json();
        setSubjects(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const res = await fetch('/api/admin/subjects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (res.ok) {
            setSuccess('Subject added successfully');
            setForm({ name: '', code: '' });
            fetchSubjects();
        } else {
            setError(data.message || 'Failed to add subject');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        const res = await fetch(`/api/admin/subjects/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchSubjects();
        } else {
            alert('Failed to delete');
        }
    };

    return (
        <Layout role="admin">
            <Head>
                <title>Manage Subjects - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>Manage Subjects</h2>
                <p>Add or remove subjects from the curriculum.</p>
            </div>

            <div className="card mb-8">
                <h3 className="mb-4">Add New Subject</h3>
                {error && (
                    <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: 'var(--error-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid #fecaca' }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: 'var(--success-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid #bbf7d0' }}>
                        {success}
                    </div>
                )}
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Subject Name</label>
                        <input
                            placeholder="e.g. Mathematics"
                            className="input-field"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Subject Code</label>
                        <input
                            placeholder="e.g. MATH101"
                            className="input-field"
                            value={form.code}
                            onChange={(e) => setForm({ ...form, code: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '46px' }}>Add Subject</button>
                </form>
            </div>

            <div className="card">
                <h3>Subject List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <tr key={subject.id}>
                                <td>{subject.id}</td>
                                <td>{subject.name}</td>
                                <td>{subject.code}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(subject.id)}
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
