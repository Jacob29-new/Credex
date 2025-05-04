async function removeMyTaskFunction(id) {
    const response = await fetch("http://localhost:3000/removetask", {
        method: "POST",
        body: JSON.stringify({ id }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

export default removeMyTaskFunction