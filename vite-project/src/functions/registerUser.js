async function register(firstName, lastName, username, email, password) {
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, username, email, password })
    });

    const data = await response.json();

    if (data.state) {
        console.log('Registration successful:', data);
        return { success: true };
    } else {
        console.error('Registration failed:', data.message);
        return { success: false, message: data.message };
    }


    
}

export default register