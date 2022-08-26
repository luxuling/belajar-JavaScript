
let player

function klik(para){
				let value = para.innerHTML
				player = value
				let pc = Math.random()

pc = pc < 0.4 ? "batu" : 0.4>pc<0.7 ? "kertas" : "gunting"

let hasil
if (player === pc) {
								hasil = "seri"
				}else if (player === "batu"){
								hasil = pc === "kertas" ? "kalah" : "menang"
				} else if (player === "kertas"){
								hasil = pc === "gunting" ? "kalah" : "menang"
				}else if (player === "gunting") {
								hasil = pc === "batu" ? "kalah" : "menang"
				}

document.getElementById("com").innerHTML = pc

document.getElementById("hasil").innerHTML = hasil
}



