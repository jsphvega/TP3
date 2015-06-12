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
  var autoComplete;
  var infowindow;
  var servicePlaces;

  function initialize() {

    showDeaultLocation();

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

    // Create an Autocomplete and link it to the UI element.
    var input = /** @type {HTMLInputElement} */ (
      document.getElementById('pac-input'));

    autoComplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */
      (input), {
        types: ['geocode']
      });

    infowindow = new google.maps.InfoWindow();
    servicePlaces = new google.maps.places.PlacesService(map);

    addListeners();

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

  // Auxiliary functions
  function onPlaceChanged() {
    infowindow.close();
    marker.setVisible(false);

    var place = autoComplete.getPlace();
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

      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(map, marker);
    }
    //otherwise
    else {
      marker.setOptions({
        title: null
      });
      alert('place not found');
    }
  }

  function addListeners(){

    //set the value of the hidden inputs when the position changes
    google.maps.event.addListener(marker, 'position_changed', onPositionChange);

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(autoComplete, 'place_changed',onPlaceChanged);

    // Bias the autoComplete results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      autoComplete.setBounds(bounds);
    });

  }

  function showDeaultLocation(){
    document.getElementById('latitude').innerHTML = defaultLatitude;
    document.getElementById('longitude').innerHTML = defaultLongitude;
  }

  window.onload = loadScript;

  var googleMapsAdmin = {
    initialize: initialize // Initialize Google Maps
  };

  return googleMapsAdmin;

})(window, document);
