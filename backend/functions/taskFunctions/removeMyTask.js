import { db } from '../registerFunctions/databaseHandler.js';

function removeMyTask(id) {
    const prepped = db.prepare(`DELETE FROM tasks WHERE id = ?`);
    prepped.run(id);
}

export default removeMyTask;