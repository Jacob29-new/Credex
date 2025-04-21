import { db } from "../functions/registerFunctions/databaseHandler";

async function clearDatabase() {
    console.log("Clearing database");
    try {
        const result = db.query("DELETE FROM users").run();
        console.log("Database cleared", result);
        return result;
    } catch (error) {
        console.error("Error clearing database:", error);
        return null;
    }
}

clearDatabase();