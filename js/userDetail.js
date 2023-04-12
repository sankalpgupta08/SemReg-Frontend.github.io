var name1 = document.getElementById("name")
var gender = document.querySelectorAll('input[name="gender"')
var department = document.getElementById("department")
var programme = document.getElementById("programme")
var DOB = document.getElementById("DOB")
var phno = document.getElementById("phno")
var submitbtn = document.getElementById("submitbtn")
var hideProg = document.getElementById("hideProg")
var loading = document.getElementById("loading")

var userGender
var userData = JSON.parse(sessionStorage.getItem("userData"))


if(!userData.isStudent){
    console.log(userData)
    hideProg.style.display = "none"
}

gender.forEach(gen=>{
    gen.addEventListener('change',(e)=>{
        userGender = e.target.value
    })
})


submitbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    createUser()
})


async function createUser(){
    var email = userData.email
    loading.style.display = "flex"
    
    if(userData.isStudent){
        
        var roll_no =userData.email.toString().split('@')[0]

        console.log(typeof(userData.fbId),typeof(name1.value),typeof(roll_no),typeof(programme.value),typeof(phno.value),typeof(email),typeof(department.value),typeof(DOB.value),typeof(userGender))

        const userDetail = {
            _id : userData.fbId, 
            name : name1.value,
            roll_no : roll_no,
            Program: programme.value ,
            Phone_Number : phno.value, 
            email : email,
            Department: department.value,
            Dob:DOB.value,
            Gender: userGender,
        }

        const params = {
            method : 'POST',
            headers: {
                'Content-Type': 
                'application/json'
            },
            body : JSON.stringify(userDetail)
        }

        await fetch("https://semreg.study-ezy.tech/semreg/user/",params).then((res)=>res.json()).then((data)=>{
            console.log(data)
            sessionStorage.setItem("userDetail",JSON.stringify(data))
        })

    }else{
        const userDetail = {
            _id : userData.fbId, 
            name : name1.value,
            Phone_Number : phno.value, 
            email : email,
            Department: department.value,
            Dob:DOB.value,
            Gender: userGender,
        }

        const params = {
            method : 'POST',
            headers: {
                'Content-Type': 
                'application/json'
            },
            body : JSON.stringify(userDetail)
        }

        await fetch("https://semreg.study-ezy.tech/semreg/teacher/",params).then((res)=>res.json()).then((data)=>{
            console.log(data)
            sessionStorage.setItem("userDetail",JSON.stringify(data))
        })
    }

    setTimeout(() => {
        loading.style.display = "none"
        window.location.replace("home.html")
    }, 1000);

}