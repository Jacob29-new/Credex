import { db } from '../registerFunctions/databaseHandler.js';

// Create tasks table if it doesn't exist
try {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            taskLocation TEXT NOT NULL,
            taskTime TEXT NOT NULL,
            deadline TEXT NOT NULL,
            duration TEXT NOT NULL,
            workerPreferences TEXT NOT NULL,
            workerProficiency TEXT NOT NULL,
            workerRating TEXT NOT NULL,
            taskUrgency TEXT NOT NULL,
            credits_offered INTEGER NOT NULL,
            creator_id INTEGER NOT NULL,
            worker_id INTEGER,
            status TEXT DEFAULT 'posted',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
    
    console.log("Successfully created database tasks");
} catch (error) {
    console.error("Failed to create table in database");
    throw new Error('Failed to create table in database');
}

function addTask(info, userId) {
    console.log("backend addTask function called")
    const { title, description, category, taskLocation, taskTime, deadline, price, duration, workerPreferences, workerProficiency, workerRating, taskUrgency } = info;
    
    try {
        const query = `
            INSERT INTO tasks (
                title, description, category, taskLocation, taskTime, deadline, credits_offered, duration, 
                workerPreferences, workerProficiency, workerRating, taskUrgency, creator_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [title, description, category, taskLocation, taskTime, deadline, price, duration, workerPreferences, workerProficiency, workerRating, taskUrgency, userId];
        db.run(query, params);
        
        console.log("Task successfully added to the database");
        return true;
    } catch (error) {
        console.error("Failed to add task to the database", error);
        throw new Error('Failed to add task to the database');
    }
}

export default addTask;