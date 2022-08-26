document.addEventListener("DOMContentLoaded",function(){
  const submit = document.getElementById("submit")
  
  const search = document.getElementById("search-btn")
  loadBook()
  search.addEventListener("click", function(event){
    event.preventDefault()
    displaySearch()
  })
  
  submit.addEventListener("click",function(event){
    event.preventDefault()
    addBook()
    //console.log(listBook)
  })
})

let listBook = []

function generateObject(id, title, author, year, isComplete) {
  return {
        id,
        title,
        author,
        year,
        isComplete,
  }
}

function makeId(){
  return +new Date()
}
function checkThis(){
  let cBox = document.getElementById("checkbox")
  return cBox.checked
}
function addBook(){
  let id = makeId()
  let name = document.getElementById("name").value
  let writer = document.getElementById("writer").value
  let date = document.getElementById("date").value
  let checkboxVal = checkThis()
  let objData = generateObject(id, name, writer, date, checkboxVal)
  listBook.push(objData)
  
  document.dispatchEvent(new Event(RENDER_EVENT))
  saveData()
}
function makeBookList(objData){
  let lilCard = document.createElement("div")
  lilCard.classList.add("lil-card","shadow")
  
  let srt = document.createElement("div")
  srt.classList.add("str")
  lilCard.append(srt)
  
  let judul = document.createElement("h4")
  judul.innerText = `judul:${objData.title}`
  
  let penulis = document.createElement("p")
  penulis.innerText = `penulis:${objData.author}`
  
  tggl = document.createElement("p")
  tggl.innerText = `tahun:${objData.year}`
  
  srt.append(judul, penulis, tggl)

  if(objData.isComplete){
    let divBtn = document.createElement("div")
    divBtn.classList.add("btn")
    
    let undo = document.createElement("span")
    undo.classList.add("material-symbols-outlined")
    undo.innerText = "undo"
    
    undo.addEventListener("click", function(){
      undoBotton(objData.id)
    })
    
    let remove = document.createElement("span")
    remove.classList.add("material-symbols-outlined")
    remove.innerText = "backspace"
    
    remove.addEventListener("click", function() {
      let validation = confirm("yakin kamu mau menghapus buku ini?")
      
      if(validation){
       removeCard(objData.id)
      }else
      document.dispatchEvent(new Event(RENDER_EVENT))
    })
    
    lilCard.append(divBtn)
    divBtn.append(undo, remove)
  }else{
    let divBtn = document.createElement("div")
    divBtn.classList.add("btn")
    
    let check = document.createElement("span")
    check.classList.add("material-symbols-outlined")
    check.innerText = "check"
    
    check.addEventListener("click", function(){
      checkBotton(objData.id)
    })
    
    let remove = document.createElement("span")
    remove.classList.add("material-symbols-outlined")
    remove.innerText = "backspace"
    
    remove.addEventListener("click", function() {
      let validation = confirm("yakin kamu mau menghapus buku ini?")
    
      if (validation) {
        removeCard(objData.id)
      } else
        document.dispatchEvent(new Event(RENDER_EVENT))
    })
    
    lilCard.append(divBtn)
    divBtn.append(check, remove)
  }
  return lilCard
}

const RENDER_EVENT ="render-book"

document.addEventListener(RENDER_EVENT, function(){
  let readItem = document.getElementById("read-item")
  readItem.innerHTML = ""
  
  let readedItem = document.getElementById("readed-item")
  readedItem.innerHTML = ""
  
  for(let book of listBook){
    let itemElement = makeBookList(book)
    if(!book.isComplete){
      readItem.append(itemElement)
    }else{
      readedItem.append(itemElement)
    }
  }
})
function findId(objId){
  for(let isId of listBook){
    if(isId.id == objId){
    
      return isId
    }
  }
    return null
}

function undoBotton(objId){
  let itemCheck = findId(objId)
  
  if(itemCheck == null) return
  
  itemCheck.isComplete = false
  document.dispatchEvent(new Event(RENDER_EVENT))
  saveData()
}

function checkBotton(objId){
  let itemCheck = findId(objId)
  
  if(itemCheck == null) return
  
  itemCheck.isComplete = true
  document.dispatchEvent(new Event(RENDER_EVENT))
  saveData()
}

function findIdIndex(objId){
  for(let index in listBook){
    if(listBook[index].id == objId){
      return index
    }
  }
    return -1
}

 function removeCard(objId){
   let itemIndex = findIdIndex(objId)
   
   if(itemIndex == -1) return
   
   listBook.splice(itemIndex, 1)
   document.dispatchEvent(new Event(RENDER_EVENT))
   saveData()
 }

function findBook(searchValue) {
  for (let index of listBook){
    if(index.title == searchValue){
      return index
    }
  }
  return null
}

function displaySearch(){
  const searchValue = document.getElementById('search').value
  const searchBox = document.getElementById("search-result")
  searchBox.innerHTML = ""
  let book = findBook(searchValue)
  if(book){
    let bookelement = makeBookList(book)
    searchBox.append(bookelement)
  }else{
    alert(`buku ${searchValue} tidak ada di list manapun`)
  }
}

let BOOKS_KEY = "book-list"

function isStorage(){
  if(typeof(Storage)){
    return true
  }else{
    return null
  }
}

function saveData(){
  if(isStorage == null){
    alert("browser anda tidak suport localStorage")
  }else{
      let string = JSON.stringify(listBook)
      localStorage.setItem(BOOKS_KEY, string)
  }
}

function loadBook(){
  let dataBook = localStorage.getItem(BOOKS_KEY)
  let parsed = JSON.parse(dataBook)
  
  if(dataBook != null){
    for(let item of parsed){
      listBook.push(item)
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT))
}
