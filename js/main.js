var taskInput= document.getElementById('task-input')
var btn=document.getElementById("btn")
var loading=document.getElementById("loading")


btn.addEventListener("click",function(){

    if(taskInput.value==""){
        
    }
    var task={
        title:taskInput.value,
        apiKey:"65b2bb9c2681618c591c5e14"
    }
    addTodo(task)

})


async function addTodo(task){
 var data= await fetch(`https://todos.routemisr.com/api/v1/todos`,
 {
    method:"post",
    body:JSON.stringify(task),
    headers:{
        'content-type':'application/json'
    }
    
 })
var result= await data.json()
if(result.message=='success'){
    DisplayAllToDos()
}
console.log(result);
}

//display
var tasks=document.getElementById("tasks")


async function DisplayAllToDos(){
    loading.style.display='d-block'
    tasks.style.display="d-none"

var data=await fetch(`https://todos.routemisr.com/api/v1/todos/65b2bb9c2681618c591c5e14`)
var result=await data.json()
console.log(result);
if(result.message=='success'){
    
    loading.style.display='none'
    tasks.style.display="d-block"

    Display(result.todos)
}

}


function Display(data){
let cartona=``
for(let i=0;i<data.length;i++){
    cartona+=`  <div class="task my-3 px-4 py-3 d-flex justify-content-between w-75 m-auto shadow align-items-center p-2 rounded-4 ${data[i].completed?'bg-danger':""}">

    <p class="task-text m-0 p-0  ${data[i].completed? 'text-decoration-line-through':''}     ">${data[i].title}</p>
        <div class="icons ">
            <i  class="${data[i].completed ? "d-none" :""} fa-solid fa-circle-check pe-3 " onclick="ToDoAction('${data[i]._id}','put')" ></i>
            <i class="fa-solid fa-trash" onclick="ToDoAction('${data[i]._id }','delete')"></i>
        </div>
    </div>`
}
tasks.innerHTML=cartona
}
DisplayAllToDos()


//Delete

async function ToDoAction(id,method){

    var data=await fetch("https://todos.routemisr.com/api/v1/todos",{

    method,
    body:JSON.stringify({todoId:id}),
    headers:{      
          'content-type':'application/json'
}
    })
    let result=await data.json()
    if(result.message=='success'){
        DisplayAllToDos()
    }
console.log(result);
}

//complete

/*
async function markComplete(id){

    var data=await fetch("https://todos.routemisr.com/api/v1/todos",{

    method:"put",
    body:JSON.stringify({todoId:id}),
    headers:{      
          'content-type':'application/json'
}
    })
    let result=await data.json()
    if(result.message=='success'){
        DisplayAllToDos()
    }
console.log(result);
}
*/
