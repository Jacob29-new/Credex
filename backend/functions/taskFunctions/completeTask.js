import { db } from '../registerFunctions/databaseHandler.js';

function completeTask(number, taskId) {
    console.log("completeTask called with:", number, taskId);
    number = parseInt(number);
    const id = parseInt(taskId);

    if(number === 1) {
        const prepped = db.prepare(`UPDATE tasks SET status = "completed-1" WHERE id = ?`);
        const result = prepped.run(id); 
        console.log("Update result (completed-1):", result);
        return result;
    } 

    if(number === 2) {
        const prepped = db.prepare(`UPDATE tasks SET status = "completed-2" WHERE id = ?`);
        const result = prepped.run(id);
        console.log("Update result (completed-2):", result);
        return result;
    }

    if(number === 3) {
        const prepped = db.prepare(`UPDATE tasks SET status = "disputed" WHERE id = ?`);
        const result = prepped.run(id);
        console.log("Update result (disputed):", result);
        return result;
    }
    
}

export default completeTask;