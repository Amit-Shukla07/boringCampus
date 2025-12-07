import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function StudentMarks() {
    const [marks, setMarks] = useState<any[]>([]);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            fetchMarks(user.id);
        }
    }, []);

    const fetchMarks = async (id: number) => {
        const res = await fetch(`/api/student/marks?id=${id}`);
        const data = await res.json();
        setMarks(data);
    };

    return (
        <Layout role="student">
            <Head>
                <title>My Marks - Boring Campus</title>
            </Head>

            <div className="mb-8">
                <h2>My Marks</h2>
                <p>View your academic performance and grades.</p>
            </div>

            <div className="card">
                <h3>Grade History</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Exam Type</th>
                            <th>Marks Obtained</th>
                            <th>Max Marks</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((record) => {
                            const percentage = ((record.marks_obtained / record.max_marks) * 100).toFixed(1);
                            return (
                                <tr key={record.id}>
                                    <td>{record.subject_name} ({record.subject_code})</td>
                                    <td>{record.exam_type}</td>
                                    <td><strong>{record.marks_obtained}</strong></td>
                                    <td>{record.max_marks}</td>
                                    <td>
                                        <span style={{
                                            color: Number(percentage) >= 40 ? 'var(--success-color)' : 'var(--error-color)',
                                            fontWeight: 600
                                        }}>
                                            {percentage}%
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
