function completeTask(number) {
    if(number === 1) {
        console.log("completing task in stage 1")
        try {
            const response = await fetch('http://localhost:3000/complete-task', {
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
            console.error("Error accepting task:", error);
            throw error;
        }
    } else {

    }
}

export default completeTask()