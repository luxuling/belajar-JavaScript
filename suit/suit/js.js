let player = prompt("pilih batu , kertas,/gunting:")
let pc = Math.random()

pc = pc < 0.4 ? "batu" : 0.4>pc<0.7 ? "kertas" : "gunting"

console.log(pc);

let hasil

function rule(){
				if (player === pc) {
								hasil = "seri"
				}else if (player === "batu"){
								hasil = pc === "kertas" ? "kalah" : "menang"
				} else if (player === "kertas"){
								hasil = pc === "gunting" ? "kalah" : "menang"
				}else if (player === "gunting") {
								hasil = pc === "batu" ? "kalah" : "menang"
				}
}

if (player === "batu" || player === "kertas" || player === "gunting") {
				
				rule()
				
				alert(`kamu memilih: ${player},pc memilih ${pc} 				hasilnya : ${hasil}`)
    
    let mainlgi = confirm("mau main lagi?")
    
    if (mainlgi == true) {
				document.location.reload()
}else {
				window.close()
}

				
}else {
				alert("pilih yg bener")
}



