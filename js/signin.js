var colgId = document.getElementById("colgId")
var pass = document.getElementById("pass")
var signInbtn = document.getElementById("signInbtn")
var msg = document.getElementById("msg")

signInbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    signIn()
    console.log("lksf")
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

    await fetch("http://localhost:8080/auth/login/",params).then((res)=> res.json()).then((data)=>{
        console.log(data)
        if(data.msg == "user created"){
            const UserData = {
                "email" : data.email,
                "token" : data.token
            }
            sessionStorage.setItem("userData",JSON.stringify(UserData))
        }
        msg.style.display = "block"
        msg.children[0].innerText = data.msg
    })
}