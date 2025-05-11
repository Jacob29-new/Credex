import { db } from "../registerFunctions/databaseHandler.js";

try {
    db.run(`
        CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user1 INTEGER,
            user2 INTEGER,
            username1 TEXT,
            username2 TEXT
        );  
    `);
    console.log("Successfully created table links");
} catch (error) {
    console.error(error);
}

function createLink(user1, user2, username1, username2) {

    const exists = db.prepare(`SELECT * FROM links WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)`).all(user1, user2, user2, user1);
    if (exists.length > 0) return;

    const prepare = db.prepare(`INSERT INTO links (user1, user2, username1, username2) VALUES (?, ?, ?, ?)`);
    prepare.run(user1, user2, username1, username2);

    return;
}

function destroyLink(user1, user2) {
    const prepare = db.prepare(`DELETE FROM links WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?) `); 
    prepare.run(user1, user2, user2, user1);

    return;
}

function returnLinks(userId) {
    const prepare = db.prepare(`SELECT * FROM links WHERE user1 = ? OR user2 = ?`); 
    const result = prepare.all(userId, userId);

    result.forEach(link => {
        const lastMsg = db.prepare(
            `SELECT message, created_at FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT 1`
        ).get(link.id);
        link.lastMessage = lastMsg ? lastMsg.message : "";
        link.lastMessageTime = lastMsg ? lastMsg.created_at : "";
    });

    return result;
}

export { createLink, destroyLink, returnLinks };