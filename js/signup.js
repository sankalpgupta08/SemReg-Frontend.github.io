var signupbtn = document.getElementById("signupbtn")
var firstName = document.getElementById("firstName")
var lastName = document.getElementById("lastName")
var colgId = document.getElementById("colgId")
var contactNo = document.getElementById("contactNo")
var pass = document.getElementById("pass")
var confirmPass = document.getElementById("confirmPass")
var loading = document.getElementById("loading")

signupbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    signUp()
    console.log("lke")
})

async function signUp(){
    let userCrendentials = {
        "email" : colgId.value,
        "password" : pass.value
    }
    let params = {
        method: 'POST',
        headers: {
            'Content-Type': 
            'application/json'
        },
        body: JSON.stringify(userCrendentials)
    }
    loading.style.display = "flex"
    await fetch("https://semreg.study-ezy.tech/auth/signup/",params).then((res)=> res.json()).then((data)=>{
        if(data.msg == "verification link send"){
            loading.children[0].innerText = "Verification link has been sent to your email !.."
            setTimeout(() => {
                loading.style.display = "none"
            }, 2000);

            window.location.replace("signin.html");
        }else{
            loading.children[0].innerText = data.msg
            setTimeout(() => {
                loading.style.display = "none"
            }, 2000);
        }
    })
}