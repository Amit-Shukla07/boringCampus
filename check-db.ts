import db from './lib/db';

const students = db.prepare('SELECT * FROM students').all();
console.log('Students:', students);

const admins = db.prepare('SELECT * FROM admins').all();
console.log('Admins:', admins);
