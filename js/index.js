
async function getdata(){
    var userdata 
    console.log("hello")
      await fetch('https://semreg.study-ezy.tech/semreg/user')
     .then(response => response.json())
     .then(data => {
       // Do something with the data
    //    userdata= data
    console.log("jlskdf")
       console.log(data)
     })
     .catch(error => {
        console.log(error)
       // Handle the error
     });
   
console.log("fj")
}

getdata()