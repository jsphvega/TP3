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

/****************************************************************************************************
 * Funcion que carga todos los viajes por medio de una lista para que puedan ser accesados          *
 ****************************************************************************************************/
function CargarViajes(Lista){

    document.getElementById('DIV1-ListaOculta').innerHTML = "";

    //Ciclo que va ir asignando los datos en la lista
    for (var i=0; i<Lista.length; i++){
        document.getElementById('DIV1-ListaOculta').innerHTML += "" +
            "<u> <a onclick='VerEditar(\"" + Lista[i] + "\")'>Ver/Editar</a></u> " +
            Lista[i] +"<br>";
    }

    ;
}

/****************************************************************************************************
 * Funcion que va llamar la pantalla emergente con los datos escogidos por el usuario               *
 ****************************************************************************************************/
function VerEditar (Dir) {
    //VAriable Local
    var Ir = "VerLibreta.html?Dir=" + Dir + "";

    //Abre la pantalla emergente
    window.open(Ir, "1", "scrollbars=0, toolbars=0, resizable=no, width=600,height=340");
}

/****************************************************************************************************
 * Funcion que lo que realiza es partir el texto en una lista que inluya los tag, comidas y amigos  *
 ****************************************************************************************************/
function PartirTexto(Texto){

    var Palabras = Texto.split(' ');
    var NuevoTexto = [];

    for (var i=0; i<Texto.length; i++) {

        if (Palabras[i].charAt(0) == '#'){
            NuevoTexto.push(Palabras[i].toString().toLowerCase());
        }
    }

    return NuevoTexto;
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
    CargarViajes(["Joseph","Yulay","Lucia"]);
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

function ModificarViaje() {

    if (confirm("¿Esta seguro de sus datos?")) {
        alert("Viaje editado correctamente");
    } else {
        alert("Error al editar el viaje");
    }

    close();
}

function ColocaUsuario () {

    var Usuario = ObtenerVariables().user;

    if (Usuario != "NONE"){
        document.getElementById('LV-Bienvenido').innerHTML += ":" + Usuario;
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

function InicioVer(){
    document.getElementById('VE-Direccion').innerHTML = ObtenerVariables().Dir;
}