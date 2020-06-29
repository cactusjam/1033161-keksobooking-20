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

  function enableForm() {
    if (window.map.element.classList.contains('map--faded')) {
      window.pin.uploadData();
      window.map.element.classList.remove('map--faded');
      window.util.toggleElementsDisabled(mapItems, false);
    }
  }

  window.map = {
    size: mapSize,
    element: map,
    pinsContainer: pinsContainer,
    filter: mapFilters,
    enable: enableForm,
    items: mapItems
  };
})();
