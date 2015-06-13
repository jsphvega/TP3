var googleMapsAdmin = (

    function googleMaps(window, document) {

        var initMethod = 'googleMapsAdmin.initialize';
        var defaultLatitude = 9.748917;
        var defaultLongitude = -83.753428;
        var defaultPosition;
        var mapOptions;
        var defaultZoom = 5;
        var mapContainer = 'map-canvas';
        var marker;
        var markers = [];
        var map;
        var geocoder;
        var defaultTitleMaker = '';
        var autoComplete;
        var infoWindow;
        var servicePlaces;
        var visitedPlace = 'Imagenes/flag.png';
        var currentPosition = {
            name: '',
            lat: '',
            lng: ''
        };

        function initMap() {
            geocoder = new google.maps.Geocoder();
            defaultPosition = new google.maps.LatLng(defaultLatitude, defaultLongitude);
            mapOptions = {
                zoom: defaultZoom,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                heading: 90,
                tilt: 45,
                center: defaultPosition
            };
            map = new google.maps.Map(document.getElementById(mapContainer),mapOptions);
            marker = new google.maps.Marker({
                position: defaultPosition,
                title: defaultTitleMaker,
                animation: google.maps.Animation.DROP,
                map: map,
                draggable: true
            });
            infoWindow = new google.maps.InfoWindow();
            servicePlaces = new google.maps.places.PlacesService(map);
        }

        function connectLogicWithGUI() {
            // Create an Autocomplete and link it to the UI element.
            var input = /** @type {HTMLInputElement} */ (
            document.getElementById('pac-input'));

            autoComplete = new google.maps.places.Autocomplete(
            /** @type {HTMLInputElement} */
            (input), {
                types: ['geocode']
            });
        }

        function initialize() {
            showDefaultLocation();
            initMap();
            connectLogicWithGUI();
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

            //marker.setVisible(false);

            var lat = this.getPosition().lat();
            var lng = this.getPosition().lng();

            document.getElementById('latitude').innerHTML = lat;
            document.getElementById('longitude').innerHTML = lng;
        }

        function updateCurrentPosition(placeName, lat, lng) {
            currentPosition.name = placeName;
            currentPosition.lat = lat;
            currentPosition.lng = lng;
        }

        // Auxiliary functions
        function onPlaceChanged() {
            infoWindow.close();
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

      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infoWindow.open(map, marker);
      updateCurrentPosition(place.name, place.lat, place.lng);
    }
    //otherwise
    else {
      marker.setOptions({
        title: null
      });
      alert('place not found');
    }
  }


  function onDragEnd(event) {


    var lat = event.latLng.lat();
    var lng = event.latLng.lng();

    console.log('drag end');

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          marker.setOptions({
            map: map,
            position: latlng
          });
          var address = results[0].formatted_address;
          infoWindow.setContent(address);
          infoWindow.open(map, marker);
          updateCurrentPosition(address, lat, lng);
          //console.log(results);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  function onDragStart(event) {
    infoWindow.close();
    console.log('drag start');
  }

  function onBoundsChanged() {
    var bounds = map.getBounds();
    autoComplete.setBounds(bounds);
  }

  function addListeners() {

    //set the value of the hidden inputs when the position changes
    google.maps.event.addListener(marker, 'position_changed', onPositionChange);

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(autoComplete, 'place_changed', onPlaceChanged);

    // Bias the autoComplete results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', onBoundsChanged);

    google.maps.event.addListener(marker, 'dragstart', onDragStart);

    google.maps.event.addListener(marker, "dragend", onDragEnd);

  }

  function showDefaultLocation() {
    document.getElementById('latitude').innerHTML = defaultLatitude;
    document.getElementById('longitude').innerHTML = defaultLongitude;
  }

  function getCurrentPosition() {
    return currentPosition;
  }

  function setMarkers(places) {
    //loop between each of the json elements
    for (var i = 0, length = places.length; i < length; i++) {
      var data = places[i],
          latLng = new google.maps.LatLng(data.lat, data.lng);
      // Creating a marker and putting it on the map
      var image = visitedPlace;
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: data.name,
        icon: image
      });

      markers.push(marker);

      infoBox(map, marker, data);
    }
  }

  function infoBox(map, marker, data) {
    var infoWindow = new google.maps.InfoWindow(
        {
          maxWidth: 200
        }
    );
    // Attaching a click event to the current marker
    google.maps.event.addListener(marker, "click", function (e) {
      var title = data.name;
      var dateStart = data.FechaInicio;

      var contentString = '<div id="content">' +
          '<div id="bodyContent">' +
          '<p><b>' + title + '</b>' +
          '</p>' +
          '<p><b>Fecha inicio: </b>' +
          dateStart +
          '</p>' +
          '<p></p>' +
          '</div>' +
          '</div>';

      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
    });
  }

  // Sets the map on all markers in the array.
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setAllMap(null);
    console.log('remove markers');
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }


  function loadPlaces(places) {
    if (map) {
      deleteMarkers();
      setMarkers(parsePlaces(places));
      console.log('----------------places:');
      console.log(parsePlaces(places));
    }
  }

  function parsePlaces(places) {

    placesJSON = [];
    for (var i = 0, length = places.length; i < length; ++i) {
      var data = places[i];
      var place = {};
      place.name = data[0];
      place.lat = data[1];
      place.lng = data[2];
      place.Tag = data[3];
      place.FechaInicio = data[4];
      place.FechaFinal = data[5];
      place.Comida = data[6];
      place.Amigos = data[7];
      placesJSON.push(place);
    }

    return placesJSON;
  }

  window.onload = loadScript;

  var googleMapsAdmin = {
    initialize: initialize, // Initialize Google Maps
    getCurrentPosition: getCurrentPosition, //
    loadPlaces: loadPlaces
  };

  return googleMapsAdmin;

})(window, document);