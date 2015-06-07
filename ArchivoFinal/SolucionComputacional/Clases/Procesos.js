function Redireccionar(tipo) {

  var valor = document.getElementById("Nombre").value;
  var direccion = ("LibretaViajero.html?json=" + tipo);


  if (tipo == "old") {
    location.href = direccion + "&user=NONE";
  } else {
    if (!valor == "") {
      location.href = direccion + "&user=" + valor;
    } else {
      alert("No debe dejar el espacio en blanco");
    }
  }
}
