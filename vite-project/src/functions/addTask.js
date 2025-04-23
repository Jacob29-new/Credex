async function addTask(info) {
    console.log("addTask function called")
    try {
        const response = await fetch('http://localhost:3000/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', 
            body: JSON.stringify(info)
        });
        
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
}

export default addTask;