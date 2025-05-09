async function readNotification(info) {
    const response = await fetch("http://localhost:3000/read-notification", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(info),
        credentials: "include"
    })

    const data = await response.json();
    return data;    
}

export default readNotification