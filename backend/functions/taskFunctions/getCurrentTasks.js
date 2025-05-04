import { db } from '../registerFunctions/databaseHandler.js';

function getCurrentTasks(userId, callback) {


    const prepped = db.prepare(`SELECT * FROM tasks WHERE creator_id = ?`);
    const result = prepped.all(userId);

    return result
}

export default getCurrentTasks;


