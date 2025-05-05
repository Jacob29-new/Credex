import express from 'express';
import cors from 'cors';
import register from './functions/registerFunctions/register.js';
import login from './functions/loginFunctions/login.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import addTask from './functions/taskFunctions/addTask.js';
import getCurrentTasks from "./functions/taskFunctions/getCurrentTasks.js"
import getFindTasks from "./functions/taskFunctions/getFindTasks.js";
import removeMyTask from "./functions/taskFunctions/removeMyTask.js";
import acceptTask from './functions/taskFunctions/acceptTask.js';
import getMyTodoTasks from './functions/taskFunctions/getMyTodoTasks.js';

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
            maxAge: 1 * 60 * 60 * 1000, 
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

app.post("/add-task", async (req, res) => {
    console.log("request got to server / add-task")
    try {
        const token = req.cookies['JWT'];  
        if (!token) {
            return res.json({ error: 'Authentication required' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;
        const username = decoded.username;

      
        await addTask(req.body, userId, username);

        res.json({ message: "Task added successfully" });
    } catch (err) {
        console.error('JWT Verification Error:', err);

        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token' });  
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });  
        }
        
        res.status(500).json({ error: 'Server error' });
    }
});

app.get("/getcurrenttasks", async (req, res) => {

    const token = req.cookies['JWT'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const info = await getCurrentTasks(userId)
    return res.json(info)
})

app.get("/getmytodotasks", async (req, res) => {
    const token = req.cookies['JWT'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const info = await getMyTodoTasks(userId);
    return res.json(info)
})

app.post("/accept-task", async (req, res) => {
    try {
        const token = req.cookies['JWT'];
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;

        const { taskId } = req.body;
        if (!taskId) {
            return res.status(400).json({ error: 'Task ID required' });
        }

        const info = await acceptTask(userId, taskId);
        return res.json(info);
    } catch (err) {
        console.error('Error in /accept-task:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get("/getfindtasks", async (req, res) => {

    const token = req.cookies['JWT'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    try {
        const info = await getFindTasks(userId);
        return res.json(info);
    } catch (error) {
        console.error("Error in /getfindtasks:", error);
        res.status(500).json({ error: "Failed to retrieve tasks" });
    }
})

app.post("/removetask", async (req, res) => {
    const id = req.body.id;
    try {
        removeMyTask(id);
        res.json({ message: "Task removed successfully" });
    } catch (error) {
        res.json({ error: "Failed to remove task" });
    }   
})



app.get("/get-jwt", (req, res) => {
    const token = req.cookies['JWT'];


    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return res.json(decoded);  
    } catch (err) {
        return res.status(401).json({ message: "Failed to verify token" });
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});