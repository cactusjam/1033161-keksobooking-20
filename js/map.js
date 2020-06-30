'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mapItems = document.querySelectorAll('select, fieldset');

  var mapSize = {
    yMin: 130,
    yMax: 630,
    xMin: 0,
    xMax: 1200
  };

  function enableMap() {
    if (map.classList.contains('map--faded')) {
      window.pin.uploadData();
      map.classList.remove('map--faded');
      window.util.toggleElementsDisabled(mapItems, false);
    }
  }

  function disableMap() {
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
      window.util.toggleElementsDisabled(mapItems, true);
      window.pin.dell();
    }
  }

  disableMap();

  window.map = {
    size: mapSize,
    element: map,
    pinsContainer: pinsContainer,
    filter: mapFilters,
    enable: enableMap,
    disable: disableMap
  };
})();
