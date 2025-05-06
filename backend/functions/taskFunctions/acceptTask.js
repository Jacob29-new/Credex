import { db } from '../registerFunctions/databaseHandler.js';

function acceptTask(userId, taskId, workerUsername) {
    const prepped = db.prepare(`UPDATE tasks SET worker_id = ?, status = 'accepted', worker_username = ? WHERE id = ?`);
    const result = prepped.run(userId, workerUsername, taskId); 
    return result;
}

export default acceptTask;