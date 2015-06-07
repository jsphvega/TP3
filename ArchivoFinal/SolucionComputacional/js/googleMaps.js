var googleMapsAdmin = (function googleMaps(window, document) {

  var map;
  var markers = [];
  var initMethod = 'googleMapsAdmin.initialize';
  var defaultIconImage = 'images/spotlight-poi.png';
  // Costa Rica
  // http://www.doogal.co.uk/LatLong.php
  // Google Maps lat/long finder
  var defaultLatitude = 9.748917;
  var defaultLongitude = -83.753428;
  var defaultMessage = 'Bienvenido!';
  var defaultZoom = 3;
  var mapContainer = 'map-canvas';

  function initialize() {
    var mapOptions = {
      zoom: defaultZoom,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      center: new google.maps.LatLng(defaultLatitude, defaultLongitude),
      icon: defaultIconImage
    };
    map = new google.maps.Map(document.getElementById(mapContainer),
      mapOptions);

    map.setTilt(45);

    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

    var searchBox = new google.maps.places.SearchBox(
      /** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        //var image = {
        //  url: place.icon,
        //  size: new google.maps.Size(71, 71),
        //  origin: new google.maps.Point(0, 0),
        //  anchor: new google.maps.Point(17, 34),
        //  scaledSize: new google.maps.Size(25, 25)
        //};

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          icon: defaultIconImage,
          title: place.name,
          position: place.geometry.location
        });

        markers.push(marker);

        bounds.extend(place.geometry.location);
      }

      map.fitBounds(bounds);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function () {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });

    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

        //var infowindow = new google.maps.InfoWindow({
        //  map: map,
        //  position: pos,
        //  content: defaultMessage
        //});

        map.setCenter(pos);
      }, function () {
        handleNoGeolocation(false);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(defaultLatitude, defaultLongitude),
      content: content,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      icon: defaultIconImage
    };

    //var infowindow = new google.maps.InfoWindow(options);

    map.setCenter(options.position);
  }

  function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places&callback=' + initMethod;
    document.body.appendChild(script);
  }

  window.onload = loadScript;

  var googleMapsAdmin = {
    initialize: initialize // Initialize Google Maps
  };

  return googleMapsAdmin;

})(window, document);
