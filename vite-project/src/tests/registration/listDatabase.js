import { db } from "../../functions/registerFunctions/databaseHandler";

async function listDatabase() {
    console.log("function called")
    const users = db.query(`SELECT * FROM users`).all();
    console.log(users);
    return users;
}

listDatabase();