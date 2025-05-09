import { db } from "../registerFunctions/databaseHandler";

function readNotification(id) { 
    const prepped = db.prepare(`UPDATE notifications SET "read" = "true" WHERE id = ?`); 
    prepped.run(id); 
}   

export default readNotification