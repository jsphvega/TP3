/****************************************************************************************************
 * Funcion que traslada de pantalla principal a libreta de viajero.                                 *
 ****************************************************************************************************/
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

/****************************************************************************************************
 * Funcion que traslada de ibreta de viajero a pantalla principal.                                  *
 ****************************************************************************************************/
function ViajaAPrincipal() {

    //Condicion que valida si desea vlover o no a pantalla principal
    if (confirm("¿Esta seguro de volver?")) {
        location.href = "Principal.html";
    }
}

/*****************************************************************************************************
 * Funcion que revisa cual opcion se presiono para mostrar en pantalla.                              *
 *****************************************************************************************************/
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

/****************************************************************************************************
 * Funcion que extrae las variables del url.                                                        *
 ****************************************************************************************************/
function ObtenerVariables(){
    //Variables Locales
    var url = location.search.replace("?", "");
    var ListaVaiables = url.split("&");
    var ArregloObjetos = {};

    //Ciclo que va ir partiendo las variables en una lista de objetos
    for(var i=0; i<ListaVaiables.length; i++){
        var x= ListaVaiables[i].split("=");
        ArregloObjetos[x[0]]=x[1]
    }

    return ArregloObjetos;
}

/****************************************************************************************************
 * Funcion que bloquea y desbloquea la opcion de importar datos.                                    *
 ****************************************************************************************************/
function VerOpcionBusqueda() {
    if (document.getElementById('DIV1-Buscar').style.display == 'none') {
        document.getElementById('DIV1-Buscar').style.display='block';
        document.getElementById('DIV1-Importar').innerHTML = 'Ocultar';
    } else {
        document.getElementById('DIV1-Buscar').style.display='none';
        document.getElementById('DIV1-Importar').innerHTML = 'Importar';
    }
}

/****************************************************************************************************
 * Funcion que convierte los datos de tipo HTML a texto corriente conservando los mismos formatos.  *
 ****************************************************************************************************/
function ConvertirTextoLista() {
    str = document.getElementById("DIV1-ListaOculta").value;
    str = str.replace(/\r\n|\n/g,'<br>');
    document.getElementById('DIV1-ListaVisible').innerHTML = str;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// POR REVISAR Y COSNTRUIR                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Funcion que se ejecuta al comenzar la pantalla Viajero
 */
function InicioViajero() {
    ColocaUsuario();
    BloqueoListButton(1);
    CargarViajes([["http://yahoo.com","Yahoo"],
      ["http://google.com","Google"],
      ["http://webdeveloper.com","Web Developer"]]);
    OpcionMapa();
    ConvertirTextoLista();
}

function AgregarViaje() {
    if (confirm("¿Esta seguro de sus datos?")) {
        alert("Viaje almacenado correctamente");
    } else {
        alert("Error al almacenar el viaje");
    }
    MostrarOcultar(false)
}

function ColocaUsuario () {

    var Usuario = ObtenerVariables().user;

    if (Usuario != "NONE"){
        document.getElementById('LV-Bienvenido').innerHTML += ":" + Usuario;
    } else {
        document.getElementById('LV-Bienvenido').innerHTML += ":" + Usuario; //Arreglar con el .json
    }
}

function BloqueoListButton (pos) {
    if (pos == 2) {
        document.getElementById('DIV1-Tags').disabled = true;
        document.getElementById('DIV1-FechaInicio').disabled = false;
        document.getElementById('DIV1-FechaFin').disabled = false;
    } else if (pos == 3) {
        document.getElementById('DIV1-Tags').disabled = false;
        document.getElementById('DIV1-FechaInicio').disabled = true;
        document.getElementById('DIV1-FechaFin').disabled = true;
    } else {
        document.getElementById('DIV1-Tags').disabled = true;
        document.getElementById('DIV1-FechaInicio').disabled = true;
        document.getElementById('DIV1-FechaFin').disabled = true;
    }
}

function TrazarRuta() {
    alert("Opcion Trazar ruta vista");
}

function VerDistancia() {
    alert("Opcion ver distancia vista");
    document.getElementById('DIV1-Ruta').checked = true;
}

function OpcionMapa() {
    alert("Opcion Mapa Publico vista");
}

function CargarViajes(Lista){
  document.getElementById('DIV1-ListaOculta').innerHTML = "";

  for (i=0; i<Lista.length; i++){
    document.getElementById('DIV1-ListaOculta').innerHTML += "" +
        "<a href='"+ Lista[i][0] +"'>"+ Lista[i][1] +"</a> <br>";
  }
}