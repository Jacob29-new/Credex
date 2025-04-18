import express from 'express';
import cors from 'cors';
import register from './functions/registerFunctions/register.js';
import login from './functions/loginFunctions/login.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();



app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.post('/register', async (req, resp) => {
    const registerUser = await register(req.body)
    if(registerUser.success) {
        resp.json({message: "succesfully registered user", state: true})
    } else {
        resp.json({message: registerUser.message, state: false})
    }

});

app.post('/login', async (req, resp) => {
    const loginUser = await login(req.body)
    if(loginUser.state) {
        resp.cookie('JWT', loginUser.token, {
            httpOnly: true,
            sameSite: 'Lax', 
            maxAge: 1 * 60 * 30 * 1000, 
            path: '/' 
        });
        resp.json({message: "successfully logged in user", state: true})
    } else {
        resp.json({message: loginUser.message, state: false})
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('JWT', {
        httpOnly: true,
        sameSite: 'Lax',
        path: '/'
    });

    res.json({ message: "Logged out" });
});

app.get("/authenticated", async (req, resp) => {  
    
    if (!req.cookies) {
        console.log("No cookies found in request");
        return resp.status(401).json(false);
    }

    // checks if cookies exist

    const token = req.cookies['JWT'];
    
    if (!process.env.JWT_SECRET_KEY) {
        console.log("JWT_SECRET_KEY environment variable is not set!");
        process.env.JWT_SECRET_KEY = "temporary-dev-key";
    }
    
    // checks if token exists
    if(!token) {
        return resp.status(401).json(false);
    }
    
    // verifies the validity of the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch(error) {
        console.log("error verifying JWT token", error);
        return resp.status(401).json(false);
    }

    resp.json(true);
}); 

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});