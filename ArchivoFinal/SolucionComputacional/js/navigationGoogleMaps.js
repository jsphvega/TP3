var navigationAdmin = (function googleMaps(window, document) {

  function changeTab(){
    alert('Change tab');
  }

  var navigationAdmin = {
    changeTab: changeTab // Initialize Google Maps
  };

  return navigationAdmin;

})(window, document);
