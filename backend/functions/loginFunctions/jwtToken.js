import jwt from 'jsonwebtoken';


async function jwtToken(secret_key, payload) {

    try {
        //Creates a jwt
        const token = jwt.sign(payload, secret_key, { expiresIn: '1h' }) 
        console.log("JWT successfully generated")

        //returns the jwt
        return { state: true, token: token }

    } catch (error) {
        console.log("Error generating JWT token", error)
        return { state: false, message: "Error generating JWT" }
    }

}

export default jwtToken

