import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'smbs.db');
const db = new Database(dbPath);

export function initDatabase() {
    // Students Table
    db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL, -- In a real app, hash this!
      roll_number TEXT UNIQUE NOT NULL
    )
  `);

    // Subjects Table
    db.exec(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      code TEXT UNIQUE NOT NULL
    )
  `);

    // Student Subjects (Enrollment)
    db.exec(`
    CREATE TABLE IF NOT EXISTS student_subjects (
      student_id INTEGER,
      subject_id INTEGER,
      FOREIGN KEY(student_id) REFERENCES students(id),
      FOREIGN KEY(subject_id) REFERENCES subjects(id),
      PRIMARY KEY (student_id, subject_id)
    )
  `);

    // Attendance Table
    db.exec(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      subject_id INTEGER,
      date TEXT NOT NULL, -- ISO date string YYYY-MM-DD
      status TEXT NOT NULL, -- 'present' or 'absent'
      FOREIGN KEY(student_id) REFERENCES students(id),
      FOREIGN KEY(subject_id) REFERENCES subjects(id)
    )
  `);

    // Marks Table
    db.exec(`
    CREATE TABLE IF NOT EXISTS marks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      subject_id INTEGER,
      marks_obtained REAL NOT NULL,
      max_marks REAL NOT NULL,
      exam_type TEXT NOT NULL, -- e.g., 'Midterm', 'Final'
      FOREIGN KEY(student_id) REFERENCES students(id),
      FOREIGN KEY(subject_id) REFERENCES subjects(id)
    )
  `);

    // Announcements Table
    db.exec(`
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `);

    // Admin Table (or just a flag in students? No, separate is better for security separation usually, but for simple app maybe just hardcoded or a separate table)
    // Let's create a separate admins table for clarity
    db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

    // Seed Admin if not exists
    const adminCheck = db.prepare('SELECT * FROM admins WHERE username = ?').get('admin');
    if (!adminCheck) {
        db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', 'admin123');
    }
}

export default db;
