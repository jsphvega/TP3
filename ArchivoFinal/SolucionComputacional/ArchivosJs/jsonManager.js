//Se encarga de todos los procesos relacionados con el .json
var jSONManager = ( function (){

    function loadJSON(path) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true); // Replace 'my_data' with the path to your file

        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                Nose(xobj.responseText);
            } else {
                alert("No se pudo");
            }
        };

        xobj.send(null);
    }

    function download(filename, text) {

        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        } else {
            pom.click();
        }
    }

    function saveJSON(filename, data){

        var jsonData = JSON.stringify(data);
        download(filename, jsonData);
    }

    var jsonManager = {
        loadJSON: loadJSON,
        saveJSON: saveJSON
    };

    return jsonManager;

})();

function Nose (response) {

    // Parse JSON string into object
    var currentJSON = JSON.parse(response);

    alert(currentJSON);
    alert(currentJSON.Nombre);
    alert(currentJSON.Viajes.Latitud);
}
