setTimeout(
  function () {
    var file = 'places.json';
    jSONManager.loadJSON(file, function (response) {
      // Parse JSON string into object
      var currentJSON = JSON.parse(response);
      var places = currentJSON.Viajes;
      googleMapsAdmin.loadPlaces(places);
    });
  }
  , 5000);
