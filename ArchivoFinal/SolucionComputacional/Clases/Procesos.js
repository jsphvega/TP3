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

function Volver() {
    if (confirm("¿Esta seguro de volver?")) {
        location.href = "Principal.html";
    }
}

function InicioPantalla () {
    document.getElementById('Textarea').value = "af\nsdsdbsfg";
}

function MostrarOcultar(Condicion) {
    if (Condicion) {
        document.getElementById('Espacio1').style.display='none';
        document.getElementById('Espacio2').style.display='block';
    } else {
        document.getElementById('Espacio1').style.display='block';
        document.getElementById('Espacio2').style.display='none';
    }
}