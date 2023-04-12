var colgId = document.getElementById("colgId")
var pass = document.getElementById("pass")
var signInbtn = document.getElementById("signInbtn")
var msg = document.getElementById("msg")
var loading = document.getElementById("loading")
var loginMember = document.querySelectorAll('input[name="loginMember"]')

var isStudent = true



loginMember.forEach(mem=>{
    mem.addEventListener('change',(e)=>{
        if(e.target.value == "student"){
            isStudent = true
        }else{
            isStudent = false
        }
    })
})



signInbtn.addEventListener('click', (e) => {
    e.preventDefault()
    signIn()
})

async function signIn() {
    var userCrendentials = {
        "email": colgId.value,
        "password": pass.value
    }

    const params = {
        method: "POST",
        headers: {
            'Content-Type':
                'application/json'
        },
        body: JSON.stringify(userCrendentials)
    }

    loading.style.display = "flex"


    await fetch("https://semreg.study-ezy.tech/auth/login/",params).then((res)=> res.json()).then((data)=>{
        console.log(data.msg)
        if(data.msg == "Logged In"){
            loading.children[0].innerText = "Sucessfully Logged In !.."

            const UserData = {
                "email": data.email,
                "token": data.token,
                "fbId" : data.id,
                "isStudent" : isStudent
            }
            sessionStorage.setItem("userData", JSON.stringify(UserData))
            setTimeout(() => {
                loading.style.display = "none"
                window.location.replace("userDetail.html")
            }, 2000);
        }

        msg.innerHTML = `<div class="alert alert-warning alert-dismissible fade show position-absolute"
        style="margin-top: 11vh;margin-left: 1vw;" role="alert">
        <p>${data.msg}</p>
        <button type="button" class="btn-close abtn" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        msg.children[0].innerText = data.msg
    }
    )
}
