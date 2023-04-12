var notiDiv = document.getElementsByName("main")[0]

async function getNotifications(){
    const fbId = JSON.parse(sessionStorage.getItem("userData")).fbId
    console.log(fbId)
    await fetch(`https://semreg.study-ezy.tech/semreg/user/ouser/${fbId}`).then((res)=>res.json()).then((data)=>{
        console.log(data)
    })
}

getNotifications()