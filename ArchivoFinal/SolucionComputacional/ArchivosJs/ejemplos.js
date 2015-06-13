var file = 'places.json';
jSONManager.loadJSON(file, function(response) {
  // Parse JSON string into object
  var currentJSON = JSON.parse(response);
  console.log(currentJSON);
  console.log(currentJSON.place);
  console.log(currentJSON.defaultLatitude);
  //jSONManager.saveJSON('places2.json', currentJSON);

  //googleMapsAdmin.loadPlaces();

});
