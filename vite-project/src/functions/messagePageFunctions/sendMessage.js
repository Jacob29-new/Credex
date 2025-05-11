async function sendMessage(info) {
    const response = await fetch("http://localhost:3000/send-message", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
            "Content-Type": "application/json" 
        },
        credentials: "include"
    })

    const data = response.json()
    return data
}

export default sendMessage