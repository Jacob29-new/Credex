async function returnLinks() {
    const response = await fetch("http://localhost:3000/return-links", {
        method: "GET",
        headers: {
            "Content-Type": "application-/json" 
        },
        credentials: "include"
    })

    const data = response.json()
    return data
}

export default returnLinks