import { db } from '../registerFunctions/databaseHandler.js';

function completeTask(number, taskId, credits_offered, worker_id, creator_id) {
    console.log("completeTask called with:", number, taskId);
    number = parseInt(number);
    const id = parseInt(taskId);

    if(number === 1) {
        console.log("Hello. Updating task to completed-1 with ID:", id);
        const prepped = db.prepare(`UPDATE tasks SET status = "completed-1" WHERE id = ?`);
        const result = prepped.run(id); 
        console.log("Update result (completed-1):", result);
        return result;
    } 

    if(number === 2) {
        console.log("Hello. Updating task to completed-2 with ID:", id);
        const prepped = db.prepare(`UPDATE tasks SET status = "completed-2" WHERE id = ?`);
        const result = prepped.run(id);
        console.log("Update result (completed-2):", result);

        /// Add the credits to the workers account
        const prepped2 = db.prepare(`UPDATE users SET credits = credits + ? WHERE id = ?`);
        const result2 = prepped2.run(credits_offered, worker_id);
        console.log("Update result (credits):", result2);

        /// Remove the credits from the creator's account
        const prepped3 = db.prepare(`UPDATE users SET credits = credits - ? WHERE id = ?`);
        const result3 = prepped3.run(credits_offered, creator_id);
        console.log("Update result (credits):", result3);
        return result3;

    }

    if(number === 3) {
        console.log("Hello. Updating task to disputed with ID:", id);
        const prepped = db.prepare(`UPDATE tasks SET status = "disputed" WHERE id = ?`);
        const result = prepped.run(id);
        console.log("Update result (disputed):", result);
        return result;
    }
    
}

export default completeTask;