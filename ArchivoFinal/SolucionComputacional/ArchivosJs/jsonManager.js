/****************************************************************************************************
 * Se encarga de todos los procesos relacionados con el .json                                       *
 ****************************************************************************************************/
var AdminJSON = ( function (){

    //Lista que contiene los datos
    var ListaJSON = ["","",[]];

    //Funcion para cargar los datos del archivo .json
    function CargarJSON(Direccion, pos) {

        var Objeto = new XMLHttpRequest();

        // Reemplaza 'my_data' con la direccion del archivo
        Objeto.open('GET', Direccion, true);

        //Crea una funcion que muestra los datos en pantalla
        Objeto.onload = function () {

            //Revisa si existe el archivo
            if (Objeto.readyState == 4 && Objeto.status == "200") {

                if (pos) {
                    EnlistaJSON(Objeto.responseText);
                } else {
                    EnlazaJSON(Objeto.responseText)
                }
            }
        };

        Objeto.send(null);
    }

    //Funcion para enlistar los datos del archivo
    function EnlistaJSON (Archivo) {

        ListaJSON[0] = "";
        ListaJSON[1] = "";
        ListaJSON[2] = [];

        //Crea los datos en una variable
        var DatosJSON = JSON.parse(Archivo);

        //Asigna los datos
        ListaJSON[0] = (DatosJSON.Nombre);
        ListaJSON[1] = (DatosJSON.Tipo);

        //Asigna los datos que estan en la lista
        for(var i=0; i<DatosJSON.Viajes.length; i++){
            ListaJSON[2] = ListaJSON[2].concat([DatosJSON.Viajes[i]]);
        }
    }

    //Funcion para enlistar los datos del archivo
    function EnlazaJSON (Archivo) {

        //Crea los datos en una variable
        var DatosJSON = JSON.parse(Archivo);

        //Asigna los datos
        DatosJSON.Nombre = ListaJSON[0];
        DatosJSON.Tipo = ListaJSON[1];

        //Asigna los datos que estan en la lista
        for(var i=0; i<ListaJSON[2].length; i++){
            DatosJSON.Viajes = DatosJSON.Viajes.concat([ListaJSON[2][i]]);
        }

        var Nombre = (document.getElementById('LV-Bienvenido').innerHTML).split(":");
        //LLama al proceso de guardar
        SalvaJSON(Nombre[1] + ".json",DatosJSON);
    }

    //Funcion que descarga los archivo en escritorio
    function DescargaJSON(Archivo, Texto) {

        //Crea el elemento
        var Documento = document.createElement('a');

        //Asigna atributos
        Documento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(Texto));
        Documento.setAttribute('download', Archivo);

        //Revisa si se pudo crear el archivo
        if (document.createEvent) {
            var Evento = document.createEvent('MouseEvents');
            Evento.initEvent('click', true, true);
            Documento.dispatchEvent(Evento);
        }
        else {
            Documento.click();
        }
    }

    //Funcion que salva el archivo
    function SalvaJSON(Archivo, Base){

        var BaseJSON = JSON.stringify(Base);
        DescargaJSON(Archivo, BaseJSON);
    }

    //Lista de Variables a llamar
    var jsonManager = {
        CargarJSON: CargarJSON,
        SalvarJSON: SalvaJSON,
        Lista: ListaJSON
    };

    return jsonManager;

})();