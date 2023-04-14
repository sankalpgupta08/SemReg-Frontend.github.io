var loading = document.getElementById("loading")
var leftOpt = document.querySelectorAll(".attributes")
var showData = document.getElementById("showData")
var userinfoDiv = document.getElementById("userinfoDiv")
var curUser = document.getElementById("curUser")
var userDetail = JSON.parse(sessionStorage.getItem("userDetail"))
var listOfUsers = []
var _id

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
        _id = userDetail._id
        curUser.innerText = userDetail.name
    }
}

isuserSignedIn()


curUser.innerText = userDetail.name

leftOpt.forEach(opt => {
    opt.addEventListener('click', (e) => {
        dotask(opt)
    })
});


async function dotask(opt) {
    console.log(opt.children[1].innerText)

    // here define urls for to get completed students and incompleted students etc
    // and then pass to the function


    showData.innerHTML = `
        <div style="display: flex;justify-content: center;align-items: center;height:40vh;">
            <div>
                loading...
            </div>
        </div> `


    if (opt.children[1].innerText == "Dashboard") {
        var url = `https://semreg.study-ezy.tech/semreg/teacher/studentslist/${_id}`
        await showStud(url)
    }
    else if (opt.children[1].innerText == "Completed") {
        var url = `https://semreg.study-ezy.tech/semreg/teacher/filter/regcmplt/${_id}`
        await showStud(url)
    } else if (opt.children[1].innerText == "Incomplete") {
        var url = `https://semreg.study-ezy.tech/semreg/teacher/filter/notregcmplt/${_id}`
        await showStud(url)
    } else if (opt.children[1].innerText == "Log Out") {
        await logout()
    }
}


// calling for first time
showStud(`https://semreg.study-ezy.tech/semreg/teacher/studentslist/${_id}`)



async function showStud(url) {
    console.log(userDetail)
    // console.log(_id)
    await fetch(url).then((res) => res.json()).then((data) => {
        // console.log(data[0],"lkfs")
        // data.students = ["kf","lsjf"]
        if (data.length == 0) {
            showData.innerHTML = `
        <div style="display: flex;justify-content: center;align-items: center;height:40vh;">
            <div>
                No Student yet ...
            </div>
        </div> `
        } else {
            listOfUsers = []
            showData.innerHTML = `
            `
            console.log(data[0])
            for (const stu in data) { // add fbId of student
                listOfUsers.push(data[stu])
                showData.innerHTML += `
                <div class="values" id="${data[stu]._id}">
                <div class="val1">
                    <img class="img" src="/img/userlogo.png" alt="">
                    <div style="padding:0px 0px 0px 5px;">student</div>
                </div>
                <div class="val2">${data[stu].roll_no}</div>
                <div class="val1">${data[stu].Department}</div>
                <div class="val3">${data[stu].Semester}</div>
                <div class="val2">${data[stu].Gender}</div>
                <div class="val1">${data[stu].email}</div>
                <div class="val2">${data[stu].registrationCompleted}</div>
                <button type="button" class="btn btn-success" id="${data[stu].fbid}" style="margin:.5vw;"> ${data[stu].registrationCompleted ? "Verified" : "Verify"}</button>
            </div>
                `
            }
            // console.log(outer.children)
            var students = document.querySelectorAll(".values")
            var buttons = document.querySelectorAll(".btn-success")

            students.forEach(std => {
                std.addEventListener('click', (e) => {
                    userinfoDiv.innerHTML = `
                    <div style="display: flex;justify-content: center;align-items: center;height:40vh;">
                    <div>
                        loading...
                    </div>
                    </div>
                    `
                    showStudDetail(std)
                })
            })

            buttons.forEach(btn=>{
                btn.addEventListener('click',(e)=>{
                    console.log(btn.parentElement.id)
                    makeVerify(btn.parentElement.id)
                })
            })
        }
    })
}


async function makeVerify(docid){
    const params = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "registrationCompleted": true,
        })
    }
    console.log()
    await fetch(`https://semreg.study-ezy.tech/semreg/user/ouser/${docid}`,params).then((res)=>res.json()).then((data)=>{
        console.log(data)
        showStud(`https://semreg.study-ezy.tech/semreg/teacher/studentslist/${_id}`)
    })
}

async function showStudDetail(std) {
    // var currStudent = listOfUsers.find(std)
    // to change
    console.log(std.id)
    for (const el of listOfUsers) {
        if (el._id == std.id) {
            currStudent = el
            break
        }
    }
    // console.log(currStudent)

    await fetch(`https://semreg.study-ezy.tech/semreg/doc/odoc/${std.id}`).then((res) => res.json()).then((data) => {
        console.log(data)
        userinfoDiv.innerHTML = `
        <div class="pic">
                        <div class="rollno val">${currStudent.roll_no}</div>
                        <div class="fitim"><img class="fitimg" src="/img/userlogo.png" alt=""></div>
                        <div class="name bold">${currStudent.name}</div>
                        <div class="name val ">${currStudent.Department}</div>
                    </div>
                    <div class="alldetails">
                        <div class="details">
                            <div class="fields">
                                <div class="inner bold">Age</div>
                                <div class="inner val">20</div>
                            </div>
                            <div class="fields">
                                <div class="inner bold">Gender</div>
                                <div class="inner val">${currStudent.Gender}</div>
                            </div>
                        </div>
                        <div class="details">
                            <div class="fields">
                                <div class="inner bold"> Date of Birth </div>
                                <div class="inner val">${currStudent.Dob}</div>
                            </div>
                            <div class="fields">
                                <div class="inner bold">Email</div>
                                <div class="inner val">${currStudent.email}</div>
                            </div>
                        </div>

                        <div class="details">
                            <div class="fields">
                                <div class="inner bold">Semester</div>
                                <div class="inner val">${currStudent.Semester}</div>
                            </div>
                            <div class="fields">
                                <div class="inner bold">Year</div>
                                <div class="inner val">3rd</div>
                            </div>
                        </div>
                        <div class="forms">
                            <div class="documents bold">Documents Uploaded</div>
                            <div>
                                <div class="flex">
                                    <div class="link"><a href="${data.registrationForm}"><button class="but"
                                                style="width: 140px; height: 45px;">Registration Form</button></a></div>
                                    <div class="link"><a href="${data.feeReceipt}"><button class="but"
                                                style="width: 140px; height: 45px;">Fee Receipt</button></a></div>
                                </div>
                                <div class="flex">
                                    <div class="link"><a href="${data.castCertificate}"><button class="but"
                                                style="width: 140px; height: 45px;">Caste Certificate</button></a></div>
                                    <div class="link"><a href="${data.incomeCertificate}"><button class="but"
                                                style="width: 140px; height: 45px;">Income Certificate</button></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    })

}




// async function showRej() {

//     // same as showStud
//     outer.innerHTML = "Loading..."
// }


async function logout() {
    loading.style.display = "flex"
    await fetch("https://semreg.study-ezy.tech/auth/logout/", { method: "POST" }).then((res) => res.json()).then((data) => {
        sessionStorage.clear()
        console.log(data)
        setTimeout(() => {
            window.location.replace("signin.html")
        }, 1000);
    })
}