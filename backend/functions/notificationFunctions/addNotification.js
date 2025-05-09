import { db } from "../registerFunctions/databaseHandler"

try {
    db.run(`
        CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT ,
            time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            priority TEXT,
            read TEXT DEFAULT 'false',
            category TEXT,
            recipient_id INTEGER
        );  
    `);
    console.log("Successfully created database");
} catch (error) {
    console.error("Failed to create table in database notifications");
    throw new Error('Failed to create table in database notifications');
}


function addNotification(info) {
    const { title, description, priority, category, recipient_id } = info;
    try {
        const prepare = db.prepare(`INSERT INTO notifications (title, description, priority, category, recipient_id) VALUES (?, ?, ?, ?, ?)`);
        prepare.run(title, description, priority, category, recipient_id);
    } catch (error) {
        console.error("Failed to add notification to the database:", error.message);
        throw error; 
    }
}

export default addNotification

