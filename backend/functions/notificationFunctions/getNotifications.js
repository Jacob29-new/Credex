import { db } from "../registerFunctions/databaseHandler"

function getNotifications(userId) {
    const prepped = db.prepare(`SELECT * FROM notifications WHERE recipient_id = ?`).all(userId)
    return prepped
}

export default getNotifications