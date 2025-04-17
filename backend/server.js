import express from 'express';
import cors from 'cors';
import register from './functions/registerFunctions/register.js';

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});