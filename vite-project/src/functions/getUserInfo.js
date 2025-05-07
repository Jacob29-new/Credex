async function getUserInfo() {
    try {
        const response = await fetch("http://localhost:3000/user-info", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        console.log("getUserInfo response:", data);
        return data;
    } catch (error) {
        console.error("Error in getUserInfo:", error);
        throw error;
    }
}

export default getUserInfo;