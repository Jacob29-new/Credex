import { db } from "../registerFunctions/databaseHandler.js";

function returnMessages(chatId) {
    const prepare = db.prepare(`SELECT * FROM messages WHERE chat_id = ?`); 
    const result = prepare.all(chatId);


    return result;
}

export default returnMessages