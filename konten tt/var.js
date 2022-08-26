//nilainya dapat di ubah
var a = 1
a = 2 
console.log(a)
//masalah saat menggunakan var
{
  //loacal scope
  var b = "local"
}
  //global scope
//dapat di ambil dari global
console.log(b)
//dapat di ubah dari global
b = "global"
console.log(b)


