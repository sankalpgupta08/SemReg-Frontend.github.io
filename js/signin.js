var colgId = document.getElementById("colgId")
var pass = document.getElementById("pass")
var signInbtn = document.getElementById("signInbtn")
var msg = document.getElementById("msg")
var loading = document.getElementById("loading")

signInbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    signIn()
})

async function signIn() {
    var userCrendentials = {
        "email" : colgId.value,
        "password" : pass.value
    }   
    
    const params = {
        method : "POST",
        headers: {
            'Content-Type': 
            'application/json'
        },
        body: JSON.stringify(userCrendentials)
    }

    loading.style.display = "flex"
try{
    await fetch("https://semreg.study-ezy.tech/auth/login/",params).then((res)=> res.json()).then((data)=>{
        console.log(data)
        if(data.msg == "User Created"){
            loading.style.innerText = "Sucessfully Logged In !.."
            const UserData = {
                "email" : data.email,
                "token" : data.token
            }
            sessionStorage.setItem("userData",JSON.stringify(UserData))
            setTimeout(() => {
                window.location.replace("home.html")
            }, 2000);
        }

        loading.style.display = "none"
        msg.style.display = "block"
        msg.children[0].innerText = data.msg
    
    }
    )}
    catch(e){
        console.log(e)
    }
}