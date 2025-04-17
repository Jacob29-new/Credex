
import secretKey from "./secretKey.js";
import verifyUser from "./verifyUser.js";
import jwtToken from "./jwtToken.js";
import getInfo from "./getInfo.js";



async function login({ username, email, password }) {
    console.log('loginUser function called with:', { username, email, password });

    // processed user
    console.log(`Currently processing request to login from: ${username}`);

    // verifies password
    const accessGranted = await verifyUser({ username, email, password });
    if (!accessGranted.state) {
        return { state: false, message: accessGranted.message };
    }
    console.log(`verified user`);

    // get info about user 
    const info = await getInfo(username, email);
    if (info.state === false) {
        console.log(`failed to get info about user`);
        return { state: false, message: info.message };
    }
    console.log(`got info about user`);

    // creates a secret key
    const secret_key = await secretKey();
    console.log(`generated secret key`);

    //  payload 
    const payload = {
        id: info.id,
        firstName: info.firstName,  
        lastName: info.lastName,    
        username: info.username,
        email: info.email
    };
    console.log(`created payload`);

    // generates jwt token
    const requestJWT = await jwtToken(secret_key, payload);
    if (!requestJWT) {
        return { state: false, message: requestJWT.message };
    }
    const jwt_token = requestJWT.token;
    console.log(`generated jwt token`);

    // returns successful login message
    return { state: true, message: "Login successful", token: jwt_token };
}

export default login;