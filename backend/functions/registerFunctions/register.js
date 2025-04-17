import hasher from "./hasher.js"
import addToDatabase from "./databaseHandler.js"
import verifyRegistration from "./verifyRegistration.js"

async function register(userInfo) {

    // Makes 4 constants from received data
    const { firstName, lastName, username, email, password} = userInfo

    //introducing proccesed user
    console.log(`Currently proccesing request to register: ${username}`)

    //hashes password
    const hashedPassword = await hasher(password)
    console.log("succesfuly hashed password")

    //checks if account is taken
    const accountTaken = await verifyRegistration(username,email)
    if(accountTaken) {
        console.log("Registration failed, account is taken")
        return { success: false, message: "Account is already taken" };
    }

    //inserts new user into database
    await addToDatabase(firstName, lastName, username, email, hashedPassword)
    console.log("executed addToDatabase function")

    //verifies if user exists in database, returns true if registration was succesful
    const userCreated = await verifyRegistration(username,email)
    if(userCreated) {
        console.log("Confirmed registration of user")
        return { success: true};
    } else {
        console.log("Registration wasn't succesful")
        return { success: false, message: "Account wasnt found in the database" };
    }
}

export default register