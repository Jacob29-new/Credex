import { Database } from 'bun:sqlite';

// creates a database
const db = new Database('./users.db');

try {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("Successfully created database");
} catch (error) {
    console.error("Failed to create table in database");
    throw new Error('Failed to create table in database');
}

async function addToDatabase(firstName, lastName, username, email, password) {
    const instructions = `
        INSERT INTO users (firstName, lastName, username, email, password)
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        db.run(instructions, [firstName, lastName, username, email, password]);
    } catch (error) {
        console.error("Failed to add user to database");
        throw new Error('Failed to add user to the database');
    }
}

export default addToDatabase;
export { db };