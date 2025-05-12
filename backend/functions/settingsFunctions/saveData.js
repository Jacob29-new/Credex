import { db } from "../registerFunctions/databaseHandler";
import hasher from "../registerFunctions/hasher.js";

async function saveData(info, userId, passwordMessage) {

    //get original values 
    const originalValues = db.prepare(`SELECT firstName, lastName, location, skills, workingHours, bio, profilePic FROM users WHERE id = ?`).get(userId);

    function oldOrNewValue(newValue, oldValue) {
        if(newValue === null || newValue === "" || newValue === undefined) {
            return oldValue
        } else {
            return newValue
        }
    }

    //save with password
    if(passwordMessage === "withPassword") {
        try {
            const { firstName, lastName, location, skills, workingHours, bio, profilePic, newPassword } = info
            const hashedPassword = await hasher(newPassword)
            const prepped = db.prepare(`UPDATE users SET firstName = ?, lastName = ?, location = ?, skills = ?, workingHours = ?, bio = ?, profilePic = ?, password = ? WHERE id = ?`)
            prepped.run( oldOrNewValue(firstName, originalValues.firstName),
                oldOrNewValue(lastName, originalValues.lastName),
                oldOrNewValue(location, originalValues.location),
                oldOrNewValue(skills, originalValues.skills),
                oldOrNewValue(workingHours, originalValues.workingHours),
                oldOrNewValue(bio, originalValues.bio),
                oldOrNewValue(profilePic, originalValues.profilePic),
                hashedPassword,
                userId
            );

            return true
        } catch(error) {
            return false
        }

    }
   
    ///saave without password
    if(passwordMessage === "withoutPassword") {
        try {
            const { firstName, lastName, location, skills, workingHours, bio, profilePic } = info
            const prepped = db.prepare(`UPDATE users SET firstName = ?, lastName = ?, location = ?, skills = ?, workingHours = ?, bio = ?, profilePic = ? WHERE id = ?`)
            prepped.run( oldOrNewValue(firstName, originalValues.firstName),
            oldOrNewValue(lastName, originalValues.lastName),
            oldOrNewValue(location, originalValues.location),
            oldOrNewValue(skills, originalValues.skills),
            oldOrNewValue(workingHours, originalValues.workingHours),
            oldOrNewValue(bio, originalValues.bio),
            oldOrNewValue(profilePic, originalValues.profilePic),
            userId
        );
            return true
        } catch(error) {
            return false 
        }
        

        
    }

}

export default saveData

