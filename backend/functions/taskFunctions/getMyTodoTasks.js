import { db } from '../registerFunctions/databaseHandler.js';

function getMyTodoTasks(userId) {


    const prepped = db.prepare(`SELECT * FROM tasks WHERE worker_id = ?`);
    const result = prepped.all(userId);

    return result
}

export default getMyTodoTasks;
