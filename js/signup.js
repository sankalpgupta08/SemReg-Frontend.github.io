var signupbtn = document.getElementById("signupbtn")
var firstName = document.getElementById("firstName")
var lastName = document.getElementById("lastName")
var colgId = document.getElementById("colgId")
var contactNo = document.getElementById("contactNo")
var pass = document.getElementById("pass")
var confirmPass = document.getElementById("confirmPass")

signupbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(firstName.value)
})