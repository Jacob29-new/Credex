async function acceptTask(info) {
    console.log("acceptTask function called")
    try {
        const response = await fetch('http://localhost:3000/accept-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(info)  // expects an object such as { taskId: ... }
        });
        
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error accepting task:", error);
        throw error;
    }
}

export default acceptTask;