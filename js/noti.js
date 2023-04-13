var notiDiv = document.getElementsByTagName("main")[0]

async function getNotifications(){
    // const s = JSON.parse(sessionStorage.getItem("userDetail")).User.remark
    // console.log(s,"kd")

    const fbId = JSON.parse(sessionStorage.getItem("userData")).fbId
    await fetch(`https://semreg.study-ezy.tech/semreg/user/ouser/${fbId}`).then((res)=>res.json()).then((data)=>{
        console.log(data.User.remark)
        const userDetail = data.User
        if(userDetail.remark.length == 0){
            notiDiv.children[0].children[0].innerHTML = `No Notifications yet !!!`
        }else{
            notiDiv.innerHTML = ""
            for (const noti in userDetail.remark) {
                notiDiv.innerHTML += `
                <div class="notif_card unread" id="${noti}">
                <img src="" alt="  ">
                <div class="description">
                    <p class="user_activity ">
                        <strong>Mohit sir</strong> ${userDetail.remark[noti]}
                    </p>
                    <p class="time">1m ago</p>
                </div>
                </div> 
                `
            }
        }
    })
}

getNotifications()