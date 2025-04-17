function AuthenticateUser(user) {  
    if(user.username === "admin" && user.password === "admin") {
        console.log("Login successful")
        return true
    } else {
        console.log("Login failed")
        return false
    }
}

export default AuthenticateUser