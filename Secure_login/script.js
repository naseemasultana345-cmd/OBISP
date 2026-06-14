// REGISTER USER
function registerUser(){

    let fullName = document.getElementById("fullName").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // VALIDATION

    if(fullName==="" || username==="" || email==="" ||
       phone==="" || dob==="" || gender==="" ||
       password==="" || confirmPassword===""){

        alert("Please fill all fields");
        return;
    }

    // EMAIL VALIDATION

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)){

        alert("Invalid Email Address");
        return;
    }

    // PHONE VALIDATION

    if(phone.length !== 10){

        alert("Phone number must be 10 digits");
        return;
    }

    // PASSWORD VALIDATION

    let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if(!password.match(passwordPattern)){

        alert(
        "Password must contain:\n" +
        "- 1 Uppercase Letter\n" +
        "- 1 Lowercase Letter\n" +
        "- 1 Number\n" +
        "- 1 Special Character\n" +
        "- Minimum 8 Characters"
        );

        return;
    }

    // CONFIRM PASSWORD

    if(password !== confirmPassword){

        alert("Passwords do not match");
        return;
    }

    // CHECK EXISTING USER

    if(localStorage.getItem(email)){

        alert("User already exists");
        return;
    }

    let user = {
        fullName,
        username,
        email,
        phone,
        dob,
        gender,
        password
    };

    localStorage.setItem(email, JSON.stringify(user));

    alert("Registration Successful");

    window.location.href = "index.html";
}


// LOGIN USER

function loginUser(){

    let email = document.getElementById("loginEmail").value;

    let password = document.getElementById("loginPassword").value;

    let storedUser = localStorage.getItem(email);

    if(!storedUser){

        alert("User not found");
        return;
    }

    let userData = JSON.parse(storedUser);

    if(userData.password === password){

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(userData)
        );

        alert("Login Successful");

        window.location.href = "dashboard.html";
    }
    else{

        alert("Incorrect Password");
    }
}


// LOGOUT USER

function logoutUser(){

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully");

    window.location.href = "index.html";
}


// SHOW PASSWORD LOGIN

function toggleLoginPassword(){

    let passwordInput =
    document.getElementById("loginPassword");

    if(passwordInput.type === "password"){

        passwordInput.type = "text";
    }
    else{

        passwordInput.type = "password";
    }
}


// SHOW PASSWORD REGISTER

function toggleRegisterPassword(){

    let passwordInput =
    document.getElementById("password");

    if(passwordInput.type === "password"){

        passwordInput.type = "text";
    }
    else{

        passwordInput.type = "password";
    }
}


// SHOW CONFIRM PASSWORD

function toggleConfirmPassword(){

    let confirmPassword =
    document.getElementById("confirmPassword");

    if(confirmPassword.type === "password"){

        confirmPassword.type = "text";
    }
    else{

        confirmPassword.type = "password";
    }
}