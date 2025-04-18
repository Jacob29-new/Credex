function checkIfValid(firstName, lastName, username, email, password) {

    let errors = []
    let fieldNames = ["firstName", "lastName", "username", "email", "password"];
    let items = [firstName, lastName, username, email, password]


    //checks if username is less than 6 characters
    if(username.length < 6) {
        errors.push({username: "Username must be at least 6 characters long"})
    }

    //checks if password is less than 6 characters
    if(password.length < 6) {
        errors.push({password: "Password must be at least 6 characters long"})
    }

    //checks if email is valid
    if(!email.includes("@")) {
        errors.push({email: "Email is not valid"})
    }

      //checks if fields are empty
      for(let i = 0; i < items.length; i++) {
        if(items[i] === "") {
            errors.push({[fieldNames[i]]: "Field cannot be empty"})
        }
    }

    if(errors.length === 0) {
        return {result: true}
    }

    return {result: false, errors: errors}

}

export default checkIfValid

