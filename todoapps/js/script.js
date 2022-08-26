document.addEventListener("DOMContentLoaded", function(){
  const submitForm = document.getElementById("form")
  submitForm.addEventListener("submit", function(event){
    event.preventDefault()
    addToDo()
  })
})

function addToDo(){
  const textToDo = document.getElementById("title").value
  const timeStamp = document.getElementById("date").value
  
  const generateID = generateId()
  const todoObject = generateTodoObject(generateID, textToDo, timeStamp, false)
  todos.push(todoObject)
  document.dispatchEvent(new Event(RENDER_EVENT))
  console.log(todos)
}

function generateId(){
  return +new Date()
}

function generateTodoObject(id, task, timeStamp, isCompleted){
  return{
    id,
    task,
    timeStamp,
    isCompleted
  }
}

const todos = []
const RENDER_EVENT = "render-todo"

document.addEventListener(RENDER_EVENT, function() {
  const uncompletedTODOList = document.getElementById('todos');
  uncompletedTODOList.innerHTML = '';
  
  const completedTODOList = document.getElementById("completed-todos")
  completedTODOList.innerHTML = ""
  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) {
      uncompletedTODOList.append(todoElement);
    }else{
      completedTODOList.append(todoElement)
    }
  }
});

function makeTodo(todoObject){
  const textTitle = document.createElement("h2")
  textTitle.innerText = todoObject.task
  
  const textTimeStamp = document.createElement("p")
  textTimeStamp.innerText = todoObject.timeStamp
  
  const containerText = document.createElement("div")
  containerText.classList.add("inner")
  containerText.append(textTitle, textTimeStamp)
  
  const container = document.createElement("div")
  container.classList.add("item", "shadow")
  container.append(containerText)
  container.setAttribute(`id`,`${todoObject.id}`)
  
  
  if(todoObject.isCompleted){
    const undoButton = document.createElement("button")
    undoButton.classList.add("undo-button")
    
    undoButton.addEventListener("click", function(){
      undoTaskToCompleted(todoObject.id)
    })
    
    const trashButton = document.createElement("button")
    trashButton.classList.add("trash-button")
    
    trashButton.addEventListener("click", function(){
      removeTaskToCompleted(todoObject.id)
    })
    
    container.append(undoButton, trashButton)
  }else{
    const checkButton = document.createElement("button")
    checkButton.classList.add("check-button")
    
    checkButton.addEventListener("click", function(){
      addTaskToCompleted(todoObject.id)
    })
    container.append(checkButton)
  }
  return container
}

function addTaskToCompleted(todoId){
  const todoTarget = findTodo(todoId)
  
  if(todoTarget == null) return
  
  todoTarget.isCompleted = true
  
  document.dispatchEvent(new Event(RENDER_EVENT))
  
}

function findTodo(todoId){
  for(const todoItem of todos){
    if(todoItem.id == todoId){
      return todoItem
    }
  }
  return null
}

function removeTaskToCompleted(todoId){
  const todoTarget = findTodoIndex(todoId)
  if(todoTarget === -1) return
  
  todos.splice(todoTarget,1)
  document.dispatchEvent(new Event(RENDER_EVENT))
}

function undoTaskToCompleted(todoId){
  const todoTarget = findTodo(todoId)
  
  if(todoTarget === null) return
  
  todoTarget.isCompleted = false
  document.dispatchEvent(new Event(RENDER_EVENT))
}

function findTodoIndex(todoId){
  for(let index in todos){
    if(todos[index].id === todoId){
      console.log(todos[index])
      console.log(todos[index].id)
      return index
    }
  }
  return -1
}




