// const formData = new FormData()
var regForm = document.getElementById("regForm")
var castCert = document.getElementById("castCert")
var incCert = document.getElementById("incCert")
var feeRecp = document.getElementById("feeRecp")
var uploadbtn = document.getElementById("uploadbtn")
var currUserName = document.getElementById("currUserName")
var caste = document.querySelectorAll('input[name="caste"]');
var incomeDiv = document.getElementById('incomeDiv');
var income = document.querySelectorAll('input[name="income"]');
var toPayFee = document.getElementById('toPayFee');
var downloadFromRight = document.getElementById('downloadFromRight');
var homeRight = document.getElementById('homeRight');
var dashDash = document.getElementById('dashDash');
var dashDownlRegForm = document.getElementById('dashDownlRegForm');
var dashNoti = document.getElementById('dashNoti');
var dashLogout = document.getElementById('dashLogout');
var dashAbout = document.getElementById('dashAbout');
var loading = document.getElementById('loading');
var msg = document.getElementById('msg');


var userData
var userDetail
var isfeeDeduction = false
var toDisablebtn = true


// function for checking if any user is logged in or not
function isuserSignedIn(){
    userData = JSON.parse(sessionStorage.getItem("userData"))
    userDetail = JSON.parse(sessionStorage.getItem("userDetail"))
    console.log(userDetail)
    if(userData == null){
        window.location.replace("signin.html")
    }
    else if(userDetail == null){
        window.location.replace("userDetail.html")
    }
    else{
        currUserName.innerText = userDetail.name
    }
}



// to display Dashboard content
dashDash.addEventListener('click',(e)=>{
    homeRight.style.display = "block"
    downloadFromRight.style.display = "none"
})


// to display DownloadForm content
dashDownlRegForm.addEventListener('click',(e)=>{
    homeRight.style.display = "none"
    downloadFromRight.style.display = "block"
})



// to display ToPayFee for current user
caste.forEach(currCaste=>{
    currCaste.addEventListener('change',(e)=>{
        if(e.target.value == "sc"){
            uploadbtn.disabled = false
            incomeDiv.style.display = "none"
            toPayFee.innerText = "Fee to Pay : ₹9000"
        }else{
            incomeDiv.style.display = "block"
            income.forEach(currInc=>{
                currInc.addEventListener('change',(e1)=>{
                    isfeeDeduction = true
                    uploadbtn.disabled = false
                    if((e.target.value == "gen" || e.target.value == "obc") && e1.target.value == "1"){
                        toPayFee.innerText = "Fee to Pay : ₹9000"
                    }else if((e.target.value == "gen" || e.target.value == "obc")  && e1.target.value == "5"){
                        toPayFee.innerText = "Fee to Pay : ₹29833"
                    }else if((e.target.value == "gen" || e.target.value == "obc") && e1.target.value == "m5"){
                        toPayFee.innerText = "Fee to Pay : ₹71500"
                    }
                })
            })
        }
    })
})



// uploading docs
uploadbtn.addEventListener('click',(e)=>{
    e.preventDefault()  
    console.log("kle")
    uploadDoc()
})


// navigate to noti
dashNoti.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.replace("noti.html")
})

// about page 
dashAbout.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.replace("about.html")
})


dashLogout.addEventListener('click',(e)=>{
    logout()
})



async function logout(){
    loading.style.display = "flex"
    loading.children[0].innerText = "Logging Out !.."
    await fetch("https://semreg.study-ezy.tech/auth/logout/",{method:"POST"}).then((res)=>res.json()).then((data)=>{
        sessionStorage.clear()
        console.log(data)
        setTimeout(() => {
            window.location.replace("signin.html")
        }, 1000);
    })
}



async function uploadDoc(){
    console.log(userDetail._id)
    const docs = {
        "modelAId" : userDetail._id,
        "registrationForm" : regForm.value,
        "feeDeduction" : isfeeDeduction,
        "feeReceipt" : feeRecp.value,
        "incomeCertificate" : incCert.value,
        "castCertificate" : castCert.value
    }
    
    const params = {
        method : 'POST',
        headers: {
            'Content-Type': 
            'application/json'
        },
        body: JSON.stringify(docs)
    }

    loading.style.display = "flex"
    
    // make req
    await fetch("https://semreg.study-ezy.tech/semreg/doc/",params).then((res)=>res.json()).then((body)=>{
        msg.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show position-absolute"
        style="margin-top: 11vh;margin-left: 1vw;" role="alert">
        <p>Data Posted !!!</p>
        <button type="button" class="btn-close abtn" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
        `

        loading.style.display = "none"
    })
    
}


isuserSignedIn()