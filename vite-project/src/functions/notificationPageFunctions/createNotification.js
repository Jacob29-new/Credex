async function createNotification(info) {
    const response = await fetch("http://localhost:3000/notifications", {
        method: "POST",
        headers: {
            "Content-Type": "application-/json" 
        },
        body: JSON.stringify(info),
        credentials: "include"
    })

    const data = response.json()
    return data
}

export default createNotification