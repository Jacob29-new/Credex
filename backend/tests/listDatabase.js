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

async function listTaskDatabase() {
    console.log("function called");
    try {
        const users = db.query("SELECT * FROM tasks").all();
        console.log(users);
        return users;
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return [];
    }
}

listDatabase();