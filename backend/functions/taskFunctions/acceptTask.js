import { db } from '../registerFunctions/databaseHandler.js';
import { createLink } from '../messageFunctions/links.js';

async function acceptTask(userId, taskId, workerUsername) {

    const taskRow = db.prepare(`SELECT creator_id, creator_username FROM tasks WHERE id = ?`).get(taskId);
    if (!taskRow) throw new Error("Task not found");
    const creator_id = taskRow.creator_id;
    const creator_username = taskRow.creator_username;

    await createLink(userId, creator_id, workerUsername, creator_username);

    const prepped = db.prepare(`UPDATE tasks SET worker_id = ?, status = 'accepted', worker_username = ? WHERE id = ?`);
    const result = prepped.run(userId, workerUsername, taskId); 


    return result;
}

export default acceptTask;