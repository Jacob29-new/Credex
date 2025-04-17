async function login(usermail,password) {

    let username, email
    if (usermail.includes("@")) {
        email = usermail
        username = "atweijtweoigjmwetjweioweiothnfwfncwe"
    } else {
        username = usermail
        email = "atweijtweoigjmwetjweioweiothnfwfncwe"
    }
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (data.state) {
        console.log('Signing in failed:', data);
        return true
    } else {
        console.error('Signing in failed:', data.message);
        return false
    }


    
}

export default login