async function saveChanges(info) {
    try {
        const response = await fetch('http://localhost:3000/save-changes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(info)
        });

        const data = await response.json();
        
        if (!data.success) {
            console.log("Something went wrong at saveChanges", data);
            return false
        }

        return true
    } catch(error) {
        console.error("Error in saveData:", error); 
        return false
    }
}
export default saveChanges;