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

setTimeout(
  function () {

    var places = [
      [
        "Moravia, San José, Costa Rica",
        18.934150289348562,
        -71.09717799999999,
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
