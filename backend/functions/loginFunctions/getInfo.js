import { db } from "../registerComponents/databaseHandler.js";

async function getInfo(username, email) {
    try {
        // retrieves info from the database
        const prepped = db.prepare(`SELECT * FROM users WHERE username = ? OR email = ?`);
        const result = prepped.get(username, email);

        if (!result) {
            console.log("Retrieving data about user from database failed");
            return { state: false, message: "user doesn't exist" };
        }
        return result;
    } catch (error) {
        consoler.log("ERROR during fetching from database", error);
        return { state: false, message: "Fetching from database failed" };
    }
}

export default getInfo;