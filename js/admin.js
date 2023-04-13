var loading = document.getElementById("loading")
var leftOpt = document.querySelectorAll(".attributes")
var outer = document.getElementById("data")
var userinfoDiv = document.getElementById("userinfoDiv")

var listOfUsers = []



leftOpt.forEach(opt => {
    opt.addEventListener('click', (e) => {
        dotask(opt)
    })
});


async function dotask(opt) {
    console.log(opt.children[1].innerText)

    // here define urls for to get completed students and incompleted students etc
    // and then pass to the function


    outer.innerHTML = `
        <div style="display: flex;justify-content: center;align-items: center;height:40vh;">
            <div>
                loading...
            </div>
        </div> `


    if (opt.children[1].innerText == "Dashboard") {
        await showStud(url)
    }
    else if (opt.children[1].innerText == "Completed") {
        await showStud(url)
    } else if (opt.children[1].innerText == "Incompleted") {
        await showStud(url)
    } else if (opt.children[1].innerText == "Rejected") {
        await showStud(url)
    } else if (opt.children[1].innerText == "Log Out") {
        await logout()
    }
}


// showStud()

// async function showComp(){
//     outer.innerHTML =  `
//     <div style="display: flex;justify-content: center;align-items: center;height:40vh;">
//         <div>
//             loading...
//         </div>
//     </div> `

//     // make request same as showStud


// }

async function showStud(url) {


    // await fetch("https://semreg.study-ezy.tech/semreg/teacher/WC3lJvJwH5ai2joncafNlrSjurp2").then((res) => res.json()).then((data) => {
        // console.log(outer.children)
        data.students = ["kf","lsjf"]
        if(data.students.length == 0){
            outer.innerHTML = `
        <div style="display: flex;justify-content: center;align-items: center;height:40vh;">
            <div>
                No Student yet ...
            </div>
        </div> `
        } else{
            listOfUsers.clear()
            outer.innerHTML = ""
            for (const stu in data.students) { // add fbId of student
                listOfUsers.push(data.students[stu])
                outer.innerHTML += `
                <div class="values" id="">
                <div class="val1">
                    <img class="img" src="/img/userlogo.png" alt="">
                    <div style="padding:0px 0px 0px 5px;">student</div>
                </div>
                <div class="val2">20DCS009</div>
                <div class="val1">Computer Science</div>
                <div class="val3">20</div>
                <div class="val2">Male</div>
                <div class="val1">20dcs009@nith.ac.in</div>
                <div class="val2">Completed</div>
            </div>
                `
            }
            console.log(outer.children)
            var students = document.querySelectorAll(".values")

            students.forEach(std=>{
                std.addEventListener('click',(e)=>{
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
        }
    // })
}


function showStudDetail(std){
    var currStudent = listOfUsers.find(std)
    // to change
    userinfoDiv.innerHTML = `
    <div class="pic">
                    <div class="rollno val">20dcs009</div>
                    <div class="fitim"><img class="fitimg" src="/img/userlogo.png" alt=""></div>
                    <div class="name bold">Student</div>
                    <div class="name val ">Computer Science and Engineering</div>
                </div>
                <div class="alldetails">
                    <div class="details">
                        <div class="fields">
                            <div class="inner bold">Age</div>
                            <div class="inner val">20</div>
                        </div>
                        <div class="fields">
                            <div class="inner bold">Gender</div>
                            <div class="inner val">Male</div>
                        </div>
                    </div>
                    <div class="details">
                        <div class="fields">
                            <div class="inner bold"> Date of Birth </div>
                            <div class="inner val">8 November 2002</div>
                        </div>
                        <div class="fields">
                            <div class="inner bold">Email</div>
                            <div class="inner val">20dcs009@nith.ac.in</div>
                        </div>
                    </div>
                    <div class="details">
                        <div class="fields">
                            <div class="inner bold">Caste</div>
                            <div class="inner val">General</div>
                        </div>
                        <div class="fields">
                            <div class="inner bold">Income</div>
                            <div class="inner val">1000000000000000</div>
                        </div>
                    </div>
                    <div class="details">
                        <div class="fields">
                            <div class="inner bold">Semester</div>
                            <div class="inner val">6th</div>
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
                                <div class="link"><a href="#"><button class="but"
                                            style="width: 140px; height: 45px;">Registration Form</button></a></div>
                                <div class="link"><a href="#"><button class="but"
                                            style="width: 140px; height: 45px;">Fee Receipt</button></a></div>
                            </div>
                            <div class="flex">
                                <div class="link"><a href="#"><button class="but"
                                            style="width: 140px; height: 45px;">Caste Certificate</button></a></div>
                                <div class="link"><a href="#"><button class="but"
                                            style="width: 140px; height: 45px;">Income Certificate</button></a></div>
                            </div>
                        </div>
                    </div>
                </div>
    `
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