var ListaUsuario = [];

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
 * Funcion que carga todos los viajes por medio de una lista para que puedan ser accesados          *
 ****************************************************************************************************/
function CargarViajes(Lista){

    document.getElementById('DIV1-ListaVisible').innerHTML = "";

    //Ciclo que va ir asignando los datos en la lista
    for (var i=0; i<Lista.length; i++){

        //Asigna en la pagina los datos del archivo
        document.getElementById('DIV1-ListaVisible').innerHTML += "" +

            "<u><a onclick=\"VerEditar(\'" + Lista[i] +"\')\">Ver/Editar</a></u> " +
            Lista[i] +"<br>";
    }
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
 * Funcion que bloquea opciones en pantalla dependiendo de la busqueda                              *
 ****************************************************************************************************/
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

/****************************************************************************************************
 * Funcion que se ejecuta para cargar los datos del usuario segun la busqueda realizada             *
 ****************************************************************************************************/
function CargarDatos() {
    //Extrae los datos
    var Lista = ExtraerDatosJSON();

    //Condicion para saber si esta vacia o no
    if (Lista == ""){
        alert("Error al cargar lo datos");
        return;
    }

    //Asigna el titulo en la pagina
    document.getElementById('LV-Bienvenido').innerHTML = "Bienvenido:" +
        Lista[0];

    //Condicion para saber si esta vacia o no
    if (Lista[1] != "publico"){
        alert("Error, los datos no son públicos");
        return;
    } else {
        document.getElementById('DIV1-Publico').checked = true;
    }

    //Lista de los lugares para la sesión
    var Lugares = [];
    for (var i=0; i<Lista[2].length; i++){
        Lugares = Lugares.concat(Lista[2][i][0]);
    }

    //LLama a la lista a cargar los datos
    CargarViajes(Lugares);

    //Alerta
    alert("Datos cargados correctamente");
}

/****************************************************************************************************
 * Funcion que se ejecuta al comenzar la pantalla Viajero                                           *
 ****************************************************************************************************/
function InicioViajero() {

    //Para crear el evento despues de buscar el archivo
    document.getElementById('Archivo').addEventListener('change', CargarDatos, false)

    //Para colocar el nombre si no existe
    var Usuario = ObtenerVariables().user;
    if (Usuario != "NONE"){
        document.getElementById('LV-Bienvenido').innerHTML += ":" +
            Usuario.charAt(0).toUpperCase() + Usuario.slice(1);
    }

    //Bloquea los botones de la pantalla
    BloqueoListButton(1);

    //Lo crea publico ya que el usuario es nuevo
    document.getElementById('DIV1-Publico').checked = true;
}

/****************************************************************************************************
 * Funcion que se ejecuta al comenzar la pantalla agregar viajero                                   *
 ****************************************************************************************************/
function InicioVer(){

    //Variable que obtiene la direccion del url
    var Direccion = ObtenerVariables().Dir;

    //Ciclo que va sustituyendo las letras incorrectas por letras legibles
    while(Direccion.indexOf('%20') >= 0) {
        Direccion = Direccion.replace('%20',' ');
    }

    //Asigna la direccion en la pantalla
    document.getElementById('VE-Direccion').innerHTML = Direccion;

    //Extrae los datos en la lista
    window.ListaUsuario = (ExtraerDatosJSON()[2]);

    //Ciclo que revisa y asigna los datos
    for(var i=0; i<window.ListaUsuario.length; i++){

        //COndicion que revisa si los datos de la lista coinciden con los de la direccion
        if(window.ListaUsuario[i][0] == Direccion){

            document.getElementById('VE-longitude').innerHTML = window.ListaUsuario[i][2];
            document.getElementById('VE-latitude').innerHTML = window.ListaUsuario[i][1];
            document.getElementById('VE-Inicio').innerHTML = window.ListaUsuario[i][4];
            document.getElementById('VE-Fin').innerHTML = window.ListaUsuario[i][5];
            document.getElementById('VE-Tags').innerHTML = window.ListaUsuario[i][3];
            document.getElementById('VE-Comida').value = window.ListaUsuario[i][6];
            document.getElementById('VE-Amigos').value = window.ListaUsuario[i][7];

            //informa al usuaro y retorna
            alert("Datos cargados correctamente");
            return;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// POR REVISAR Y CONSTRUIR                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/****************************************************************************************************
 * Funcion que lo que realiza es partir el texto en una lista que incluya los tag, comidas y amigos  *
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

function TrazarRuta() {
    alert("Opcion Trazar ruta vista");
}

function VerDistancia() {
    alert("Opcion ver distancia vista");
    document.getElementById('DIV1-Ruta').checked = true;
}

function Estadistica(Lista) {
    /**Se   debe   mostrar   en   todo   momento   las   siguientes   estadísticas   el   viajero:
     * Total  de  viajes,  total  de  días  en  viaje,  total  de  distancia  (en  kilómetros)
     * recorrida,  Cantidad  de ciudades visitadas, cantidad de países visitados.  
     *
     * Distancia = raiz([x2 - x1]cuadrado + [y2 - y1]cuadrado)*/

}

//PROCEDIMIENTOS DE YULAY

function ExtraerDatosJSON (){

    //[Usuario,PrivacidadMapa,[viajes]]
    //[viajes] = [NombreLugar,Latitud,Longitud,Tags,FechaLlegada,FechaIda]

    var viaje = ['TP3','publico',
        [
            ['Joseph','37.423901','-122.091497','#Haciendo #Interfaz','10/06/2015','10/06/2015',"#Pizza","#Todos"],
            ['Lucia','37.424194','-122.092699','#Haciendo #Mapa','10/06/2015','10/06/2015',"#Pizza","#Todos"],
            ['Yulay','37.423152','-122.092456','#Haciendo #JSON','10/06/2015','10/06/2015',"#Pizza","#Todos"]
        ]
    ];

    window.ListaUsuario = viaje;

    return viaje;
}