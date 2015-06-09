var googleMapsAdmin = (function googleMaps(window, document) {

  var initMethod = 'googleMapsAdmin.initialize';
  var defaultLatitude = 9.748917;
  var defaultLongitude = -83.753428;
  var defaultPosition;
  var mapOptions;
  var defaultZoom = 5;
  var mapContainer = 'map-canvas';
  var marker;
  var map;
  var defaultTitleMaker = '';
  var searchBox;

  function initialize() {

    document.getElementById('latitude').innerHTML = defaultLatitude;
    document.getElementById('longitude').innerHTML = defaultLongitude;

    defaultPosition = new google.maps.LatLng(defaultLatitude, defaultLongitude);
    mapOptions = {
      zoom: defaultZoom,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      heading: 90,
      tilt: 45,
      center: defaultPosition
    };

    map = new google.maps.Map(document.getElementById(mapContainer),
      mapOptions);

    marker = new google.maps.Marker({
      position: defaultPosition,
      title: defaultTitleMaker,
      animation:google.maps.Animation.DROP,
      map: map,
      draggable: true
    });

    //set the value of the hidden inputs when the position changes
    google.maps.event.addListener(marker, 'position_changed', onPositionChange);

    // Create an Autocomplete and link it to the UI element.
    var input = /** @type {HTMLInputElement} */ (
      document.getElementById('pac-input'));

    searchBox = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */
      (input), {
        types: ['geocode']
      });

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'place_changed', function () {
      var place = this.getPlace();
      //when place has been found
      if (place.geometry) {
        marker.setOptions({
          title: place.name,
          position: place.geometry.location
        });
        if (place.geometry.viewport) {
          marker.getMap().fitBounds(place.geometry.viewport);
        } else {
          marker.getMap().setCenter(place.geometry.location);
        }
      }
      //otherwise
      else {
        marker.setOptions({
          title: null
        });
        alert('place not found');
      }
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });

  }

  function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places&callback=' + initMethod;
    document.body.appendChild(script);
  }

  // Auxiliary functions
  function onPositionChange() {
    document.getElementById('latitude').innerHTML = this.getPosition().lat();
    document.getElementById('longitude').innerHTML = this.getPosition().lng();
  }


  window.onload = loadScript;

  var googleMapsAdmin = {
    initialize: initialize // Initialize Google Maps
  };

  return googleMapsAdmin;

})(window, document);


//
//
//var map;
//var marker;
//var initMethod = 'googleMapsAdmin.initialize';
//var defaultIconImage = 'images/spotlight-poi.png';
//var defaultTitleMaker = 'Actual';
//// Costa Rica
//// http://www.doogal.co.uk/LatLong.php
//// Google Maps lat/long finder
//var defaultLatitude = 9.748917;
//var defaultLongitude = -83.753428;
//var defaultPosition;
//var defaultZoom = 3;
//var mapContainer = 'map-canvas';
//var mapOptions;
//var autocomplete;
//
//function initialize() {
//
//  defaultPosition = new google.maps.LatLng(defaultLatitude, defaultLongitude);
//
//  mapOptions = {
//    zoom: defaultZoom,
//    mapTypeId: google.maps.MapTypeId.SATELLITE,
//    heading: 90,
//    tilt: 45,
//    center: defaultPosition,
//    position: defaultPosition
//  };
//  map = new google.maps.Map(document.getElementById(mapContainer),
//    mapOptions);
//
//  marker = new google.maps.Marker({
//    position: defaultPosition,
//    title: defaultTitleMaker,
//    map: map,
//    draggable: true
//  });
//
//  //set the value of the hidden inputs when the position changes
//  google.maps.event.addListener(marker, 'position_changed', function () {
//    document.getElementById('latitude').innerHTML = this.getPosition().lat();
//    document.getElementById('longitude').innerHTML = this.getPosition().lng();
//  });
//
//  // Create the search box and link it to the UI element.
//  var input = /** @type {HTMLInputElement} */(
//    document.getElementById('pac-input'));
//
//  autocomplete = new google.maps.places.Autocomplete(input);
//  autocomplete.setTypes(['geocode']);
//
//  google.maps.event.addListener(autocomplete, 'place_changed', onAutocomplete);
//
//  // Try HTML5 geolocation
//  if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(function (position) {
//      var pos = new google.maps.LatLng(position.coords.latitude,
//        position.coords.longitude);
//      map.setCenter(pos);
//    }, function () {
//      handleNoGeolocation();
//    });
//  } else {
//    // Browser doesn't support Geolocation
//    handleNoGeolocation();
//  }
//}
//
//function handleNoGeolocation() {
//  map.setCenter(mapOptions.position);
//}
//
//function loadScript() {
//  var script = document.createElement('script');
//  script.type = 'text/javascript';
//  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places&callback=' + initMethod;
//  document.body.appendChild(script);
//}
//
//function onAutocomplete() {
//  var place = this.getPlace();
//  //when place has been found
//  if (place.geometry) {
//    marker.setOptions({
//      title: place.name,
//      position: place.geometry.location
//    });
//    if (place.geometry.viewport) {
//      marker.getMap().fitBounds(place.geometry.viewport);
//    } else {
//      marker.getMap().setCenter(place.geometry.location);
//    }
//    marker.setVisible(true);
//  }
//  //otherwise
//  else {
//    marker.setOptions({
//      title: null
//    });
//    alert('place not found');
//  }
//}


//function initializeSearchBox() {
//
//  var places = searchBox.getPlaces();
//
//  if (places.length == 0) {
//    return;
//  }
//  for (var i = 0, marker; marker = markers[i]; i++) {
//    marker.setMap(null);
//  }
//
//  // For each place, get the icon, place name, and location.
//  markers = [];
//  var bounds = new google.maps.LatLngBounds();
//  for (var i = 0, place; place = places[i]; i++) {
//    //var image = {
//    //  url: place.icon,
//    //  size: new google.maps.Size(71, 71),
//    //  origin: new google.maps.Point(0, 0),
//    //  anchor: new google.maps.Point(17, 34),
//    //  scaledSize: new google.maps.Size(25, 25)
//    //};
//
//    // Create a marker for each place.
//    var marker = new google.maps.Marker({
//      map: map,
//      title: place.name,
//      position: place.geometry.location,
//      draggable: false
//    });
//
//    markers.push(marker);
//
//    bounds.extend(place.geometry.location);
//  }
//
//  map.fitBounds(bounds);
//}
