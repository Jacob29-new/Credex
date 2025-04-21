async function logout() {

    await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include'  
    });
    
    console.log('Logged out successfully');
    window.location.href = '/login';


}

export default logout