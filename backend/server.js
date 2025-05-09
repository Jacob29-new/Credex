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
import completeTask from './functions/taskFunctions/completeTask.js';
import { db } from './functions/registerFunctions/databaseHandler.js';
import verifyUser from './functions/loginFunctions/verifyUser.js';
import saveData from './functions/settingsFunctions/saveData.js';

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
        const workerUsername = decoded.username;

        const { taskId } = req.body;
        if (!taskId) {
            return res.status(400).json({ error: 'Task ID required' });
        }

        const info = await acceptTask(userId, taskId, workerUsername );
        return res.json(info);
    } catch (err) {
        console.error('Error in /accept-task:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post("/complete-task", async (req, res) => {
    try {
        console.log("Request body for complete-task:", req.body);
        const token = req.cookies['JWT'];
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { number, taskId, credits_offered, worker_id, creator_id } = req.body;
        console.log("Completing task with number:", number, "and taskId:", taskId);

        const info = await completeTask(number, taskId, credits_offered, worker_id, creator_id);
        console.log("complete-task info:", info);
        return res.json(info);
    } catch (err) {
        console.error('Error in /complete-task:', err);
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

app.get("/user-info", async (req, res) => {
    const token = req.cookies['JWT'];
    console.log("Token received:", token ? "present" : "missing");
    
    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }

    try {
        if (!process.env.JWT_SECRET_KEY) {
            console.log("Setting default JWT secret");
            process.env.JWT_SECRET_KEY = "temporary-dev-key";
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Token decoded:", decoded);
        
        const userId = decoded.id;
        console.log("Looking up user:", userId);

        const row = db.prepare("SELECT id, firstName, lastName, username, email, credits, bio, location, profilePic, workingHours, creditsSpent, CreditsEarned, skills FROM users WHERE id = ?").get(userId);
        
        if (!row) {
            console.log("User not found in database");
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log("User info found:", row);
        return res.json(row);
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Failed to verify token" });
    }
});

app.post("/save-changes", async (req, res) => {

    // getting basic info
    const token = req.cookies["JWT"]
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userId = decoded.id
    const userEmail = decoded.email
    const userUsername = decoded.username

    //retrieving info 
    const { firstName, lastName, location, skills, workingHours, bio, oldPassword, newPassword } = req.body

    //if user wants to change their password, verifies the old one 
    if (newPassword !== null && newPassword !== "") {
        const result = await verifyUser({ username: userUsername, email: userEmail, password: oldPassword });
        if(result.state) {
            const newResult = await saveData( { firstName, lastName, location, skills, workingHours, bio, newPassword }, userId, "withPassword")
            if(!newResult) {
                console.log("something went wrong")
                return res.send({ success: false, message: "Something went wrong"}) 
            } else {
                return res.send({ success: true, message: "Saved succesfully"})
            }
        } else {
            return res.send({ success: false, message: "password was incorrect"}) 
        }
    } 

    //if there isnt a password, this just sends the info without it
    const newResult = await saveData( { firstName, lastName, location, skills, workingHours, bio }, userId, "withoutPassword")
    if(!newResult) {
        console.log("something went wrong")
        return res.send({ success: false, message: "Something went wrong"})
    }

    return res.send({ success: true, message: "Succesful"})
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