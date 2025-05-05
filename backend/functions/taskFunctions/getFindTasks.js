import { db } from '../registerFunctions/databaseHandler.js';

function getCurrentTasks(userId) {

    const prepped = db.prepare(`SELECT * FROM tasks WHERE creator_id != ? AND worker_id IS NULL`);
    const result = prepped.all(userId);

    return result
}

export default getCurrentTasks;
