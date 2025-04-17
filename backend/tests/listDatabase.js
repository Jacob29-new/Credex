import { db } from "../functions/registerFunctions/databaseHandler";

async function listDatabase() {
    console.log("function called");
    try {
        const users = db.query("SELECT * FROM users").all();
        console.log(users);
        return users;
    } catch (error) {
        console.error("Error retrieving users:", error);
        return [];
    }
}

listDatabase();