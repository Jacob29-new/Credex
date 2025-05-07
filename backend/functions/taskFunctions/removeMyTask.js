import { db } from '../registerFunctions/databaseHandler.js';

function removeMyTask(id) {
    const prepped = db.prepare(`DELETE FROM tasks WHERE id = ?`);
    prepped.run(id);
}

function removeAllTasks() {
    console.log("Removing all tasks from the database")
    const prepped = db.prepare(`DELETE FROM tasks`);
    prepped.run();
}

function clearUsersTable() {
    try {
        db.prepare("DELETE FROM users").run();
        console.log("All users have been removed from the users table.");
    } catch (error) {
        console.error("Failed to clear users table:", error);
    }
}

function dropTasksTable() {
    try {
        db.run("DROP TABLE IF EXISTS tasks");
        console.log("Tasks table dropped successfully");
    } catch (error) {
        console.error("Failed to drop tasks table:", error);
    }
}



export default removeMyTask