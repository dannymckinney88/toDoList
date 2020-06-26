// Selectors
const tODoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//functions

function addToDo(event){
   //prevent form from submiting
    event.preventDefault();
    // toDo Div
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add("todo");
    //create Li
    const newToDo= document.createElement('li');
    newToDo.innerText = tODoInput.value;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);
    // Adding todo to local storage
    saveLocal(tODoInput.value)
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    toDoDiv.appendChild(completedButton);
    //Check trash button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    toDoDiv.appendChild(trashButton);
    //append to list
    toDoList.appendChild(toDoDiv)
    //clear todo input value
    tODoInput.value = ""
}

function deleteCheck(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation & remove
        todo.classList.add('fall')
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
        todo.remove();
        })
        ;
    }

    //Check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e){
    const todos = toDoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}


function saveLocal(todo){
    //check 
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }


    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
         // toDo Div
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add("todo");
    //create Li
    const newToDo= document.createElement('li');
    newToDo.innerText = todo;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    toDoDiv.appendChild(completedButton);
    //Check trash button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    toDoDiv.appendChild(trashButton);
    //append to list
    toDoList.appendChild(toDoDiv)

    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const tododIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(tododIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));

}