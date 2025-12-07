import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function Marks() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [examType, setExamType] = useState('Midterm');
    const [maxMarks, setMaxMarks] = useState(100);
    const [marksData, setMarksData] = useState<any>({}); // student_id -> marks_obtained
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []);

    useEffect(() => {
        if (selectedSubject) {
            fetchStudents(selectedSubject);
        } else {
            setStudents([]);
        }
    }, [selectedSubject]);

    useEffect(() => {
        if (selectedSubject && examType) {
            fetchMarks();
        } else {
            setMarksData({});
        }
    }, [selectedSubject, examType]);

    const fetchSubjects = async () => {
        const res = await fetch('/api/admin/subjects');
        const data = await res.json();
        setSubjects(data);
    };

    const fetchStudents = async (subjectId: string) => {
        if (!subjectId) {
            setStudents([]);
            return;
        }
        const res = await fetch(`/api/admin/subjects/${subjectId}/students`);
        const data = await res.json();
        setStudents(data);
    };

    const fetchMarks = async () => {
        setLoading(true);
        const res = await fetch(`/api/admin/marks?subject_id=${selectedSubject}&exam_type=${examType}`);
        const data = await res.json();

        const newMarksData: any = {};
        data.forEach((record: any) => {
            newMarksData[record.student_id] = record.marks_obtained;
            if (record.max_marks) setMaxMarks(record.max_marks);
        });
        setMarksData(newMarksData);
        setLoading(false);
    };

    const handleMarksChange = (studentId: number, value: string) => {
        setMarksData({ ...marksData, [studentId]: value });
    };

    const handleSubmit = async () => {
        setMessage('');
        const records = students.map(s => ({
            student_id: s.id,
            marks_obtained: marksData[s.id] || 0
        }));

        const res = await fetch('/api/admin/marks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject_id: selectedSubject,
                exam_type: examType,
                max_marks: maxMarks,
                records
            }),
        });

        if (res.ok) {
            setMessage('Marks saved successfully');
        } else {
            setMessage('Failed to save marks');
        }
    };

    return (
        <Layout role="admin">
            <Head>
                <title>Marks Entry - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>Marks Entry</h2>
                <p>Record student grades for exams and assignments.</p>
            </div>

            <div className="card">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Subject</label>
                        <select
                            className="input-field"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                        </select>
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Exam Type</label>
                        <select
                            className="input-field"
                            value={examType}
                            onChange={(e) => setExamType(e.target.value)}
                        >
                            <option value="Midterm">Midterm</option>
                            <option value="Final">Final</option>
                            <option value="Quiz">Quiz</option>
                        </select>
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Max Marks</label>
                        <input
                            type="number"
                            className="input-field"
                            value={maxMarks}
                            onChange={(e) => setMaxMarks(Number(e.target.value))}
                        />
                    </div>
                </div>

                {selectedSubject && (
                    <>
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

                        <div style={{ overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Marks Obtained</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'var(--slate-500)' }}>
                                                No students enrolled in this subject.
                                            </td>
                                        </tr>
                                    ) : (
                                        students.map((student) => (
                                            <tr key={student.id}>
                                                <td>{student.roll_number}</td>
                                                <td>{student.name}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="input-field"
                                                        style={{ width: '120px', padding: '0.5rem' }}
                                                        value={marksData[student.id] || ''}
                                                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                                                        placeholder="0"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {students.length > 0 && (
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button onClick={handleSubmit} className="btn btn-primary" style={{ minWidth: '150px' }}>Save Marks</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}
