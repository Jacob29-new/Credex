async function getCurrentTasks() {
    const response = await fetch("http://localhost:3000/getcurrenttasks", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data;  
}

export default getCurrentTasks