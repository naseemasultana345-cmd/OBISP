function togglePassword(id){

    let password =
    document.getElementById(id);

    if(password.type==="password"){
        password.type="text";
    }
    else{
        password.type="password";
    }
}

function register(){

    let name =
    document.getElementById("regName").value;

    let email =
    document.getElementById("regEmail").value;

    let username =
    document.getElementById("regUsername").value;

    let password =
    document.getElementById("regPassword").value;

    if(
        name==="" ||
        email==="" ||
        username==="" ||
        password===""
    ){
        alert("Please fill all fields");
        return;
    }

    let user={
        name:name,
        email:email,
        username:username,
        password:password
    };

    localStorage.setItem(
        username,
        JSON.stringify(user)
    );

    alert("Registration Successful!");

    window.location.href="index.html";
}

function login(){

    let username =
    document.getElementById("loginUsername").value;

    let password =
    document.getElementById("loginPassword").value;

    let user =
    JSON.parse(
        localStorage.getItem(username)
    );

    if(
        user &&
        user.password===password
    ){

        localStorage.setItem(
            "loggedInUser",
            user.name
        );

        window.location.href =
        "dashboard.html";
    }
    else{
        alert("Invalid Username or Password");
    }
}