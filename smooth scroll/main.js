const button = document.querySelectorAll("a")


  for(let dom of button){
    dom.addEventListener("click", function(event){
      event.preventDefault()
      if (dom.classList == dom.innerText) {
        let id = dom.innerText
        smoothScroll(id)
      }
    })
  }

let y = 0
let plus = 20
function smoothScroll(id){
  const target = document.getElementById(`${id}`).offsetTop
  
  let animation = setTimeout(function(){
    smoothScroll(id)
  },10)
  
  y += plus
  
  if(y >= target){
    clearTimeout(animation)
    y = 0
  }else{
    window.scroll(0,y)
  }
}
