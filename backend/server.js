import express from 'express';
import cors from 'cors';
import register from './functions/registerFunctions/register.js';
import login from './functions/loginFunctions/login.js';

const app = express();



app.use(cors());
app.use(express.json());

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
            maxAge: 3600000, 
            path: '/' 
        });
        resp.json({message: "successfully logged in user", state: true})
    } else {
        resp.json({message: loginUser.message, state: false})
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});