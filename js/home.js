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
var userData


// function for checking if any user is logged in or not
function isuserSignedIn(){
    userData = sessionStorage.getItem("userData")
    if(userData == null){
        window.location.replace("signin.html")
    }else{
        userData = JSON.parse(userData)
        currUserName.innerText = userData.email
    }
}

isuserSignedIn()


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
            incomeDiv.style.display = "none"
            toPayFee.innerText = "Fee to Pay : ₹8000"
        }else{
            incomeDiv.style.display = "block"
            income.forEach(currInc=>{
                currInc.addEventListener('change',(e1)=>{
                    if(e.target.value == "gen" && e1.target.value == "1"){
                        toPayFee.innerText = "Fee to Pay : ₹100000"
                    }else if(e.target.value == "gen" && e1.target.value == "5"){
                        toPayFee.innerText = "Fee to Pay : ₹500000"
                    }else if(e.target.value == "gen" && e1.target.value == "m5"){
                        toPayFee.innerText = "Fee to Pay : ₹800000"
                    }else if(e.target.value == "obc" && e1.target.value == "1"){
                        toPayFee.innerText = "Fee to Pay : ₹100000"
                    }else if(e.target.value == "obc" && e1.target.value == "5"){
                        toPayFee.innerText = "Fee to Pay : ₹500000"
                    }else if(e.target.value == "obc" && e1.target.value == "m5"){
                        toPayFee.innerText = "Fee to Pay : ₹8500000"
                    }else if(e.target.value == "sc"){
                        toPayFee.innerText = "Fee to Pay : ₹8500000"
                    }
                })
            })
        }
    })
})



// uploading docs
uploadbtn.addEventListener('click',(e)=>{
    e.preventDefault()  
    uploadDoc()
})

async function uploadDoc(){
    const formData = new FormData()
    formData.append('user-reg',regForm.files[0])
    formData.append('user-cast',castCert.files[0])
    formData.append('user-inc',incCert.files[0])
    formData.append('user-fee',feeRecp.files[0])

    // make req

}

