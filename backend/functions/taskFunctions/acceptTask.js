import { db } from '../registerFunctions/databaseHandler.js';

function acceptTask(userId, taskId) {
    const prepped = db.prepare(`UPDATE tasks SET worker_id = ? WHERE id = ?`);
    const result = prepped.run(userId, taskId); 
    return result;
}

export default acceptTask;