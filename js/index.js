var test = document.getElementById("test")

async function getdata(){
    await fetch("https://jsonplaceholder.typicode.com/todos/").then((res)=> res.json()).then((data)=>{
        data.forEach(element => {
           test.innerHTML += `
            <h3> ${element.id} <h3>
            <p> ${element.title}<p>
           `
        });
    })
}

getdata()