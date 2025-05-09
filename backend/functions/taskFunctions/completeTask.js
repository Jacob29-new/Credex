import { db } from '../registerFunctions/databaseHandler.js';
import addNotification from '../notificationFunctions/addNotification.js';

async function completeTask(number, taskId, credits_offered, worker_id, creator_id) {
    console.log("completeTask called with:", number, taskId);
    number = parseInt(number);
    const id = parseInt(taskId);

    if(number === 1) {
        console.log("Hello. Updating task to completed-1 with ID:", id);
        const prepped = db.prepare(`UPDATE tasks SET status = "completed-1" WHERE id = ?`);
        const result = prepped.run(id); 
        console.log("Update result (completed-1):", result);

        addNotification({ title: "Task aproval", description: `A task you posted has been completed, please aprove it as soon as possible`, priority: "low", category: "tasks", recipient_id: creator_id });
        return result;
    } 

    if(number === 2) {



        //řešení problemu s dvojitým voláním funkce
        const task = db.prepare(`SELECT status FROM tasks WHERE id = ?`).get(id);
        if (task.status === "completed-2") {
            console.log("Task already completed-2, skipping credit transfer.");
            return { error: "Task already completed" };
        }

        addNotification({ title: "Task completion", description: `Your task completion has been aproved, you have been given ${credits_offered} credits`, priority: "low", category: "tasks", recipient_id: worker_id });
        addNotification({ title: "Task completion", description: `You have aproved a task completion, ${credits_offered} credits have been removed from your account`, priority: "low", category: "tasks", recipient_id: creator_id });

        console.log("Hello. Updating task to completed-2 with ID:", id);
        const prepped = db.prepare(`UPDATE tasks SET status = "completed-2" WHERE id = ?`);
        const result = prepped.run(id);
        console.log("Update result (completed-2):", result);

        /// Add the credits to the workers account
        const prepped2 = db.prepare(`UPDATE users SET credits = credits + ?, CreditsEarned = CreditsEarned + ? WHERE id = ?`);
        const result2 = prepped2.run(credits_offered, credits_offered, worker_id);
        console.log("Update result (credits):", result2);

        /// Remove the credits from the creator's account
        const prepped3 = db.prepare(`UPDATE users SET credits = credits - ?, creditsSpent = creditsSpent + ? WHERE id = ?`);
        const result3 = prepped3.run(credits_offered, credits_offered, creator_id);
        console.log("Update result (credits):", result3);
        return result3;

    }

    if(number === 3) {

       addNotification({ title: "Disputed completion", description: `A disputed has been made on a task you marked as completed`, priority: "high", category: "tasks", recipient_id: worker_id });
       console.log("first");
       addNotification({ title: "Disputed completion", description: `You have made a dispute on a task`, priority: "high", category: "tasks", recipient_id: creator_id });
       console.log("second");
      
        console.log("Hello. Updating task to disputed with ID:", id);
        const prepped = db.prepare(`UPDATE tasks SET status = "disputed" WHERE id = ?`);
        const result = prepped.run(id);
        console.log("Update result (disputed):", result);

        return result;
    }
    
}

export default completeTask;