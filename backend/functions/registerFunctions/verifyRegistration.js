import { db } from "./databaseHandler.js"

function verifyRegistration(username,email) {

    try {
        const usernameResult = db.query(`SELECT * FROM users WHERE username = ?`).all(username);
        const emailResult = db.query(`SELECT * FROM users WHERE email = ?`).all(email);
    
        if (usernameResult.length > 0 || emailResult.length > 0) {
          console.log("User already exists in database");
          return true; // returns true if account is taken
        } else {
          console.log("User does not exist in database");
          return false; // returns false if accouynt isnt taken
        }
      } catch (error) {
        console.log("Database query failed:", error);
        return false; // returns false if query fails
      }


}

export default verifyRegistration