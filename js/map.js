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

  function onDataLoad(responseData) {
    var pinsMarkup = window.pin.renderList(responseData);
    pinsContainer.appendChild(pinsMarkup);
  }

  function enableMap() {
    if (map.classList.contains('map--faded')) {
      window.backend.load(onDataLoad);
      map.classList.remove('map--faded');
      window.util.toggleElementsDisabled(mapItems, false);
    }
  }

  function disableMap() {
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
      window.util.toggleElementsDisabled(mapItems, true);
      window.pin.remove();
      window.pin.centerTheMainPin();
    }
  }

  disableMap();

  window.map = {
    size: mapSize,
    element: map,
    filter: mapFilters,
    enable: enableMap,
    disable: disableMap
  };
})();
