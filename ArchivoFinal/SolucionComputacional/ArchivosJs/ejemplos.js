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
]

setTimeout(
  function () {

    var places = [
      [
        "Moravia, San José, Costa Rica",
        -84.09072459999999,
        9.9280694,
        "#primer #viaje",
        "01/06/2015",
        "06/06/2015",
        "#Pinto",
        "#Joseph #Lucia #Yulay"
      ],
      [
        "Tokio, Japón",
        139.69170639999993,
        35.6894875,
        "#segundo #viaje",
        "06/06/2015",
        "08/06/2015",
        "#sushi",
        "#Joseph #Lucia #Yulay"
      ],
      [
        "Madrid, España",
        -3.7037901999999576,
        40.4167754,
        "#tercer #viaje",
        "08/06/2015",
        "11/06/2015",
        "#CorderoAsado",
        "#Joseph #Lucia #Yulay"
      ]
    ];

    googleMapsAdmin.loadPlaces(places);
  }
  , 5000);
