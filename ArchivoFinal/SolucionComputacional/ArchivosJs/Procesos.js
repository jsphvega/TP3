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
    window.open(Ir, "1", "scrollbars=0, toolbars=0, resizable=no, width=535,height=340");
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

    //informa al usuario
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

            return;
        }
    }
}

/****************************************************************************************************
 * Funcion que calcula la distancia segun l circunferencia de la tierra                             *
 ****************************************************************************************************/
function CalcularDistancia(Lat1, Lon1, Lat2, Lon2) {

    //Funcion auxiliar que convierte a radianes
    ConvertirRadianes = function(Grados) {
        return (Grados * Math.PI) / 180;
    }

    //Radio de la tierra en KM
    var RadioTierra = 6378.137;

    //Variables que generan una distancia promedio
    var DifLat = ConvertirRadianes(Lat2 - Lat1);
    var DifLon = ConvertirRadianes(Lon2 - Lon1);

    //Variable que calcula las coordenadas de distancia
    var Coordenadas1 = Math.sin(DifLat / 2) * Math.sin(DifLat / 2) + Math.cos(ConvertirRadianes(Lat1)) *
        Math.cos(ConvertirRadianes(Lat2)) * Math.sin(DifLon / 2) * Math.sin(DifLon / 2);

    //Variable que calcula las coordenadas de distancia
    var Coordenadas2 = 2 * Math.atan2(Math.sqrt(Coordenadas1), Math.sqrt(1-Coordenadas1));

    //Distancia real final
    var DistanciaReal = RadioTierra * Coordenadas2;

    return parseFloat(DistanciaReal);
}

/****************************************************************************************************
 * Funcion que calcula la diferencia de los dias entre dos fechas                                   *
 ****************************************************************************************************/
function CalcularDias(Ini, Fin) {

    Ini = Ini.split('/');
    Fin = Fin.split('/');

    //Variables que contienen la fecha en su formato
    var Fecha1 = new Date(Ini[2] + "," + Ini[1] + "," + Ini[0]);
    var Fecha2 = new Date(Fin[2] + "," + Fin[1] + "," + Fin[0]);

    //Diferencia de las fechas y conversión a días
    var Diferencia = Fecha2.getTime() - Fecha1.getTime();
    var Dias = Math.floor(Diferencia / (1000*24*60*60));

    return Dias;
}

/****************************************************************************************************
 * Funcion que muestra las estadisticas de los viajes realizados por el usuario                     *
 ****************************************************************************************************/
function Estadistica() {

    //Condicion que valida si la lista de viajes esta vacia
    if (ListaUsuario.length == 0){
        alert("No se encuentran viajes registrados");
        return;
    }

    //Variables Locales
    var Lista = ListaUsuario[2];
    var Totales = [0,0,0,[],[]];

    //Ciclo que va recorrer toda la lista de viajes
    for (var i=0; i<Lista.length; i++){

        //Va ir contando todos los viajes existentes
        Totales[0] += 1;

        //Numero de días
        Totales[1] += CalcularDias(Lista[i][4],Lista[i][5]);

        //Distancia recorrida
        if(i < Lista.length-1){
            Totales[2] += CalcularDistancia(Lista[i][1],Lista[i][2],Lista[i+1][1],Lista[i+1][2]);
        }

        //Variable para fragmentar los lugares
        var ListaLugares = Lista[i][0].split(',');

        //Condicion que valida si existen ciudades
        if (ListaLugares.length >= 2) {

            //Variables para revisar que los datos se encuetren en orden
            var Ciudad = ListaLugares[ListaLugares.length - 1].toString();
            Ciudad = Ciudad.substr(0, 1) == " " ? Ciudad.substr(1) : Ciudad;

            //Valida si existe la ciudad
            if (!RevisarEnLista(Totales[3], Ciudad)) {
                Totales[3] = Totales[3].concat(Ciudad);
            }
        }

        //Condición que valida si existen paises
        if (ListaLugares.length >= 1){

            //Variables para revisar que los datos se encuetren en orden
            var Pais = ListaLugares[ListaLugares.length - 2].toString();
            Pais = Pais.substr(0, 1) == " " ? Pais.substr(1) : Pais;

            //Valida si existe el pais
            if(!RevisarEnLista(Totales[4], Pais)){
                Totales[4] = Totales[4].concat(Pais);
            }

        }

    }

    alert("Estadisticas de " + ListaUsuario[0] +
        "\nCantidad de viajes: " + Totales[0] +
        "\nDuracion de viajes: " + Totales[1] + " dias" +
        "\nDistancia recorrida: " + Totales[2].toFixed(2) +" km" +
        "\nCiudades Visitadas: " + Totales[3].length +
        "\nPaises Visitados: " + Totales[4].length);
}

/****************************************************************************************************
 * Funcion que revisa si el dato esta en la lista o no                                              *
 ****************************************************************************************************/
function RevisarEnLista(Lista, Palabra) {

    //Ciclo que revisa cada posicion de la lista
    for (var i=0; i<Lista.length; i++){

        //Valida si existe o no
        if (Lista[i] == Palabra){
            return true;
        }

    }

    return false;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// POR REVISAR Y CONSTRUIR                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////

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

function ModificaTexto(Texto) {

    //Ciclo que va sustituyendo las letras incorrectas por letras legibles
    while(Texto.indexOf('á') >= 0 && Texto.indexOf('é') >= 0 && Texto.indexOf('í') >= 0
        && Texto.indexOf('ó') >= 0 && Texto.indexOf('ú') >= 0) {

        //Reemplaza las tildes
        Texto = Texto.replace('á','a');
        Texto = Texto.replace('é','e');
        Texto = Texto.replace('í','i');
        Texto = Texto.replace('ó','o');
        Texto = Texto.replace('ú','u');
    }

    return Texto;
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


/////////////////////////////////////////////////////////////////////////////////////////////////////
//  PROCEDIMIENTO DE YULAY                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////
function ExtraerDatosJSON (){

    //[Usuario,PrivacidadMapa,[viajes]]
    //[viajes] = [NombreLugar,Latitud,Longitud,Tags,FechaLlegada,FechaIda]

    var viaje = ['TP3','publico',
        [
            ['Moravia, San Jose, Costa Rica',-84.09072459999999,9.9280694,'#primer #viaje','01/06/2015','06/06/2015',"#Pinto","#Joseph #Lucia #Yulay"],
            ['Tokio, Japon',139.69170639999993,35.6894875,'#segundo #viaje','06/06/2015','08/06/2015',"#sushi","#Joseph #Lucia #Yulay"],
            ['Madrid, España',-3.7037901999999576,40.4167754,'#tercer #viaje','08/06/2015','11/06/2015',"#CorderoAsado ","#Joseph #Lucia #Yulay"]
        ]
    ];

    window.ListaUsuario = viaje;

    return viaje;
}