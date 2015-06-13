//setTimeout(
//  function () {
//    var file = 'places.json';
//    jSONManager.loadJSON(file, function (response) {
//      // Parse JSON string into object
//      var currentJSON = JSON.parse(response);
//      var places = currentJSON.Viajes;
//      googleMapsAdmin.loadPlaces(places);
//    });
//  }
//  , 5000);

//setTimeout(
//  function () {
//    var file = 'places.json';
//    jSONManager.loadJSON(file, function (response) {
//      // Parse JSON string into object
//      var currentJSON = JSON.parse(response);
//      var places = currentJSON.Viajes;
//      googleMapsAdmin.loadPlaces(places);
//    });
//  }
//  , 5000);

var places = [
  {
    "name":"Unnamed Road, Nicaragua",
    "lat":12.508244831890146 ,
    "lng":-85.81885768749999 ,
    "Tag":"#primer #viaje",
    "FechaInicio":"01/06/2015",
    "FechaFinal":"06/06/2015",
    "Comida":"#Pinto",
    "Amigos":"#Joseph #Lucia #Yulay"
  },{
    "name":"Emberá, Panamá",
    "lat":8.360226146025274,
    "lng":-77.55713893749999,
    "Tag":"#segundo #viaje",
    "FechaInicio":"06/06/2015",
    "FechaFinal":"08/06/2015",
    "Comida":"#sushi",
    "Amigos":"#Joseph #Lucia #Yulay"
  }
];

setTimeout(
  function () {

    var places = [
      [
        "Madrid, España",
        37.772323,
        -122.214897,
        "#tercer #viaje",
        "08/06/2015",
        "11/06/2015",
        "#CorderoAsado",
        "#Joseph #Lucia #Yulay"
      ],[
        "Moravia, San José, Costa Rica",
        21.291982,
        -157.821856,
        "#dfhxdxgh ",
        "2015-06-13",
        "2015-06-13",
        "#fhthsx ",
        "#aegadgzz "
      ],[
        "Tokio, Japón",
        -157.821856,
        178.431,
        "#dfhxdxgh ",
        "2015-06-13",
        "2015-06-13",
        "#fhthsx ",
        "#aegadgzz "
      ]
    ];

    //googleMapsAdmin.loadPlaces(places);
    //googleMapsAdmin.showPath();

  }
  , 5000);
