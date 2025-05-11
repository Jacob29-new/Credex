import { db } from "../registerFunctions/databaseHandler";

try {
    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chat_id INTEGER,
            sender_id INTEGER,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            message_read BOOLEAN

        )
    `);
    console.log("Successfully created table messages");
} catch (error) {
    console.error("Failed to create table messages in database");
    throw new Error('Failed to create table messages in database');
}

async function sendMessage(info, userId) {
    const { chat_id, message } = info;
    try {
        const prepped = db.prepare(`INSERT INTO messages (chat_id, sender_id, message) VALUES (?, ?, ?)`).run(chat_id, userId, message);
        return prepped
       } catch (error) {
        console.error("Failed to add message to database");
        throw new Error('Failed to add message to the database');
    }
}

export default sendMessage