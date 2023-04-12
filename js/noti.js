var notiDiv = document.getElementsByName("main")[0]

async function getNotifications(){
    await fetch("https://semreg.study-ezy.tech/auth/login/")
}

getNotifications()