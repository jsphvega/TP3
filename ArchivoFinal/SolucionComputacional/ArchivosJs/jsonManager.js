var jSONManager = (function (){
  function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }
  var jsonManager = {
    loadJSON: loadJSON
  };

  return jsonManager;
})();

jSONManager.loadJSON('places.json', function(response) {
  // Parse JSON string into object
  var currentJSON = JSON.parse(response);
  console.log(currentJSON);
  console.log(currentJSON.place);
  console.log(currentJSON.defaultLatitude);
});
