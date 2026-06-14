function togglePassword(id){

let input=document.getElementById(id);

if(input.type==="password"){
input.type="text";
}
else{
input.type="password";
}
}

function registerUser(){

let fullName=document.getElementById("fullName").value.trim();
let username=document.getElementById("username").value.trim();
let email=document.getElementById("email").value.trim();
let phone=document.getElementById("phone").value.trim();
let dob=document.getElementById("dob").value;
let gender=document.getElementById("gender").value;
let password=document.getElementById("password").value;
let confirmPassword=document.getElementById("confirmPassword").value;

if(
fullName===""||
username===""||
email===""||
phone===""||
dob===""||
gender===""||
password===""||
confirmPassword===""){
alert("Please fill all fields");
return;
}

let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){
alert("Invalid Email");
return;
}

if(!/^\d{10}$/.test(phone)){
alert("Phone number must be 10 digits");
return;
}

let age=
new Date().getFullYear()
-
new Date(dob).getFullYear();

if(age<18){
alert("Age must be 18+");
return;
}

let passPattern=
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if(!passPattern.test(password)){
alert("Weak Password");
return;
}

if(password!==confirmPassword){
alert("Passwords do not match");
return;
}

let users=
JSON.parse(localStorage.getItem("users"))||[];

let exists=
users.some(user=>user.email===email);

if(exists){
alert("User already exists");
return;
}

users.push({
fullName,
username,
email,
phone,
dob,
gender,
password
});

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Registration Successful");

window.location.href="index.html";
}

function loginUser(){

let login=document
.getElementById("loginEmail")
.value.trim();

let password=document
.getElementById("loginPassword")
.value;

let users=
JSON.parse(localStorage.getItem("users"))
||[];

let user=
users.find(
u=>
(
u.email===login||
u.username===login
)
&&
u.password===password
);

if(!user){
alert("Invalid Credentials");
return;
}

localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

window.location.href="dashboard.html";
}

function logoutUser(){

localStorage.removeItem(
"currentUser"
);

window.location.href="index.html";
}

window.onload=function(){

if(window.location.pathname.includes("dashboard")){

let user=
JSON.parse(
localStorage.getItem("currentUser")
);

if(!user){

window.location.href="index.html";

return;
}

document.getElementById("welcomeTitle")
.innerHTML=
"Welcome, "+user.fullName;

document.getElementById("avatar")
.innerHTML=
user.fullName.charAt(0).toUpperCase();

document.getElementById("dashFullName")
.innerHTML=user.fullName;

document.getElementById("dashUsername")
.innerHTML=user.username;

document.getElementById("dashEmail")
.innerHTML=user.email;

document.getElementById("dashPhone")
.innerHTML=user.phone;

document.getElementById("dashGender")
.innerHTML=user.gender;

document.getElementById("dashDOB")
.innerHTML=user.dob;
}
}