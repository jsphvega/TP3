/**
 * Funcion que traslada de pantalla principal a libreta de viajero.
 * */
function ViajaAViajero(tipo) {

    //Variables locales
    var valor = document.getElementById("Nombre").value;
    var direccion = ("LibretaViajero.html?json=" + tipo);

    //Condicion que valida si es nuevo usuario o no
    if (tipo == "Viejo") {
        location.href = direccion + "&user=NONE";
    } else {

        // Condicion que valida si el campo del usuario esta vacio o no
        if (valor != "") {
            location.href = direccion + "&user=" + valor;
        } else {
            alert("No debe dejar el espacio en blanco");
        }
    }
}

/**
 * Funcion que traslada de ibreta de viajero a pantalla principal.
 * */
function ViajaAPrincipal() {

    //Condicion que valida si desea vlover o no a pantalla principal
    if (confirm("¿Esta seguro de volver?")) {
        location.href = "Principal.html";
    }
}

/**
 * Funcion que se ejecuta al comenzar la pantalla Viajero
 * @constructor
 */
function InicioViajero() {
    RellenarTextArea ();
}

/**
 * Funcion que revisa cual opcion se presiono para mostrar en pantalla
 * */
function MostrarOcultar(Condicion) {

    //Condicion que valida la condicion
    if (Condicion) {
        document.getElementById('Espacio1').style.display='none';
        document.getElementById('Espacio2').style.display='block';
    } else {
        document.getElementById('Espacio1').style.display='block';
        document.getElementById('Espacio2').style.display='none';
    }
}

///////////////////////////////////////////////////
// POR REVISAR Y COSNTRUIR
///////////////////////////////////////////////////

function AgregarViaje() {
    if (confirm("¿Esta seguro de sus datos?")) {
        alert("Viaje almacenado correctamente");
    } else {
        alert("Error al almacenar el viaje");
    }
    MostrarOcultar(false)
}

function RellenarTextArea () {
    document.getElementById('Textarea').value = "af\nsdsdbsfg";
}