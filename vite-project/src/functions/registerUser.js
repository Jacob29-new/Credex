async function register(firstName, lastName, username, email, password) {
    await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, username, email, password })
    }).then(response => response.json())
    .then(data => {
                if (data.state) {
                    console.log('Registration successful:', data);
                    return true
                } else {
                    console.error('Registration failed:', data.message);
                    return false
                }
        })

    
}

export default register