import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role: 'admin' }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--slate-50)' }}>
            {/* Top-right theme toggle for login page */}
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
            <Head>
                <title>Admin Login - Boring Campus</title>
            </Head>

            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '56px', height: '56px', backgroundColor: '#f0fdf4', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#16a34a' }}>
                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Admin Portal</h1>
                    <p style={{ fontSize: '1rem' }}>Sign in to manage Boring Campus</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '1rem', borderRadius: '10px', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #fecaca' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Sign In
                    </button>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: 'var(--slate-600)', border: '1px solid var(--slate-200)' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Test Credentials:</p>
                        <p style={{ margin: '0 0 0.25rem 0' }}>Username: <strong>admin</strong></p>
                        <p style={{ margin: 0 }}>Password: <strong>admin123</strong></p>
                    </div>
                </form>

                <div style={{ marginTop: '2.5rem', textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--slate-100)' }}>
                    <Link href="/" style={{ color: 'var(--slate-500)', fontSize: '0.9rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>&larr;</span> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
