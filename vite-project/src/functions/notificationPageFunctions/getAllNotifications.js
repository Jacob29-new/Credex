async function getAllNotifications() {
    const response = await fetch("http://localhost:3000/notifications", {
        method: "GET",
        headers: {
            "Content-Type": "application-/json" 
        },
        credentials: "include"
    })

    const data = response.json()
    return data
}

export default getAllNotifications