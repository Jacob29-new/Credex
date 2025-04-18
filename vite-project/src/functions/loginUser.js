async function login(usermail,password) {

    let username = null, email = null
    if (usermail.includes("@")) {
        email = usermail
    } else {
        username = usermail
    }
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (data.state) {
        console.log('Signing in successful:', data);
        return { success: true };
    } else {
        console.error('Signing in failed:', data.message);
        return { success: false, message: data.message };
    }


    
}

export default login