
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const [theme, setTheme] = useState<'light'|'dark'>('light');

    useEffect(() => {
        try {
            const stored = localStorage.getItem('theme');
            if (stored === 'dark') {
                document.documentElement.classList.add('dark');
                setTheme('dark');
            } else {
                document.documentElement.classList.remove('dark');
                setTheme('light');
            }
        } catch (e) {}
    }, []);

    const toggleTheme = () => {
        try {
            document.documentElement.classList.add('theme-transition');

            if (theme === 'dark') {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                setTheme('light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                setTheme('dark');
            }

            window.setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 1620);
        } catch (e) {}
    };
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
            <Head>
                <title>Boring Campus</title>
            </Head>

            {/* Navbar */}
            <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary-100)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)' }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif', color: 'var(--slate-800)' }}>Boring Campus</span>
                </div>
                <div className="top-right-toggle">
                    <button
                        role="switch"
                        aria-checked={theme === 'dark'}
                        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                        className={`theme-switch ${theme === 'dark' ? 'on' : ''}`}
                        onClick={toggleTheme}
                    >
                        <span className="thumb" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1000px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

                    {/* Left Content */}
                    <div className="animate-fade-in">
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem', border: '1px solid var(--primary-100)' }}>
                            Welcome to the New Term
                        </div>
                        <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--slate-900)' }}>
                            Growing Together <br />
                            <span style={{ color: 'var(--primary-600)' }}>Learning Forever</span>
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--slate-500)', marginBottom: '2.5rem', maxWidth: '480px', lineHeight: '1.6' }}>
                            The official portal for Boring Campus. Teachers, students, and parents can access their dashboards here.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link href="/student/login" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                                    Student Login
                                </button>
                            </Link>
                            <Link href="/admin/login" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                                    Admin Login
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Link href="/student/login" style={{ textDecoration: 'none' }}>
                            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', border: '1px solid var(--slate-200)', padding: '1.5rem' }}>
                                <div style={{ width: '56px', height: '56px', backgroundColor: 'var(--primary-50)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)', flexShrink: 0 }}>
                                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Student Portal</h3>
                                    <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Access your profile and updates.</p>
                                </div>
                                <div style={{ marginLeft: 'auto', color: 'var(--slate-400)' }}>
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admin/login" style={{ textDecoration: 'none' }}>
                            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', border: '1px solid var(--slate-200)', padding: '1.5rem' }}>
                                <div style={{ width: '56px', height: '56px', backgroundColor: '#f0fdf4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', flexShrink: 0 }}>
                                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Admin Portal</h3>
                                    <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Manage school operations.</p>
                                </div>
                                <div style={{ marginLeft: 'auto', color: 'var(--slate-400)' }}>
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
