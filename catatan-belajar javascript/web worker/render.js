addEventListener("message", function(message){
  const angka = message.data
  
  for (let i = 1; i <= angka; i++) {
    postMessage(i)
  }
})
