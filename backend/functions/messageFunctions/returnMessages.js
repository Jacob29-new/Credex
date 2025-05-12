import { db } from "../registerFunctions/databaseHandler.js";

function returnMessages(chatId, userId) {
    const prepare = db.prepare(`SELECT * FROM messages WHERE chat_id = ?`); 
    const result = prepare.all(chatId);

    const prepare2 = db.prepare(`UPDATE messages SET message_read = 1 WHERE chat_id = ? AND sender_id != ?`); 
    prepare2.run(chatId, userId);

    return result;
}

export default returnMessages