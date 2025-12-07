import Layout from '../../components/Layout';
import Head from 'next/head';

export default function AdminDashboard() {
  return (
    <Layout role="admin">
      <Head>
        <title>Admin Dashboard - Boring Campus</title>
      </Head>

      <div className="mb-8">
        <h2 style={{ marginBottom: '0.5rem' }}>Overview</h2>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid var(--primary-600)' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--primary-50)', borderRadius: '50%', color: 'var(--primary-600)' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Total Students</p>
            <h3 style={{ fontSize: '1.5rem' }}>124</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid var(--success-color)' }}>
          <div style={{ padding: '1rem', backgroundColor: '#ecfdf5', borderRadius: '50%', color: 'var(--success-color)' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Active Subjects</p>
            <h3 style={{ fontSize: '1.5rem' }}>8</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid var(--warning-color)' }}>
          <div style={{ padding: '1rem', backgroundColor: '#fffbeb', borderRadius: '50%', color: 'var(--warning-color)' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Attendance Today</p>
            <h3 style={{ fontSize: '1.5rem' }}>92%</h3>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => window.location.href = '/admin/students'}>Add Student</button>
          <button className="btn" style={{ backgroundColor: 'var(--success-color)', color: 'white' }} onClick={() => window.location.href = '/admin/attendance'}>Mark Attendance</button>
          <button className="btn" style={{ backgroundColor: 'var(--slate-500)', color: 'white' }} onClick={() => window.location.href = '/admin/announcements'}>Post Announcement</button>
        </div>
      </div>
    </Layout>
  );
}
