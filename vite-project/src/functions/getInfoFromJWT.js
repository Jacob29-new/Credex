async function getInfoFromJWT(info) {
    const response = await fetch(`http://localhost:3000/get-jwt?info=${info}`, {
        method: 'GET',
        credentials: 'include',  
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data[info];  
}

export default getInfoFromJWT