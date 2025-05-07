async function completeTask(number, taskId) {
    console.log("completeTask in frontend called with:", number, taskId);
    try {
        const response = await fetch("http://localhost:3000/complete-task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ number, taskId })
        });
        const result = await response.json();
        console.log("completeTask response:", result);
        return result;
    } catch (error) {
        console.error("Error in completeTask:", error);
        throw error;
    }
}

export default completeTask;