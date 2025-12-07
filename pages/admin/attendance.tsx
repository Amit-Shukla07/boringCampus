import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function Attendance() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState<any>({}); // student_id -> status
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
        if (selectedSubject && selectedDate) {
            fetchAttendance();
        } else {
            setAttendanceData({});
        }
    }, [selectedSubject, selectedDate]);

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

    const fetchAttendance = async () => {
        setLoading(true);
        const res = await fetch(`/api/admin/attendance?subject_id=${selectedSubject}&date=${selectedDate}`);
        const data = await res.json();

        const newAttendanceData: any = {};
        data.forEach((record: any) => {
            newAttendanceData[record.student_id] = record.status;
        });
        setAttendanceData(newAttendanceData);
        setLoading(false);
    };

    const handleStatusChange = (studentId: number, status: string) => {
        setAttendanceData({ ...attendanceData, [studentId]: status });
    };

    const handleSubmit = async () => {
        setMessage('');
        const records = students.map(s => ({
            student_id: s.id,
            status: attendanceData[s.id] || 'absent'
        }));

        const res = await fetch('/api/admin/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject_id: selectedSubject,
                date: selectedDate,
                records
            }),
        });

        if (res.ok) {
            setMessage('Attendance saved successfully');
        } else {
            setMessage('Failed to save attendance');
        }
    };

    return (
        <Layout role="admin">
            <Head>
                <title>Attendance - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>Attendance Tracking</h2>
                <p>Mark daily attendance for students.</p>
            </div>

            <div className="card">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
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
                        <label className="input-label">Date</label>
                        <input
                            type="date"
                            className="input-field"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
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

                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    const newAttendance = { ...attendanceData };
                                    students.forEach(s => newAttendance[s.id] = 'present');
                                    setAttendanceData(newAttendance);
                                }}
                                className="btn"
                                style={{ backgroundColor: 'var(--success-color)', color: 'white', border: 'none' }}
                            >
                                Mark All Present
                            </button>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Status</th>
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
                                                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                            <input
                                                                type="radio"
                                                                name={`status-${student.id}`}
                                                                checked={attendanceData[student.id] === 'present'}
                                                                onChange={() => handleStatusChange(student.id, 'present')}
                                                                style={{ accentColor: 'var(--success-color)', width: '1.2rem', height: '1.2rem' }}
                                                            />
                                                            <span style={{ color: attendanceData[student.id] === 'present' ? 'var(--success-color)' : 'inherit', fontWeight: attendanceData[student.id] === 'present' ? 600 : 400 }}>Present</span>
                                                        </label>
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                            <input
                                                                type="radio"
                                                                name={`status-${student.id}`}
                                                                checked={attendanceData[student.id] === 'absent' || !attendanceData[student.id]}
                                                                onChange={() => handleStatusChange(student.id, 'absent')}
                                                                style={{ accentColor: 'var(--error-color)', width: '1.2rem', height: '1.2rem' }}
                                                            />
                                                            <span style={{ color: attendanceData[student.id] === 'absent' || !attendanceData[student.id] ? 'var(--error-color)' : 'inherit', fontWeight: attendanceData[student.id] === 'absent' || !attendanceData[student.id] ? 600 : 400 }}>Absent</span>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {students.length > 0 && (
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button onClick={handleSubmit} className="btn btn-primary" style={{ minWidth: '150px' }}>Save Attendance</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}
