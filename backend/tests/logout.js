async function logout() {
    await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include'
    });

    console.log('Logged out successfully');
    
}

logout()

export default logout

