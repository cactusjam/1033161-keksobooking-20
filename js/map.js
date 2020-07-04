'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mapItems = document.querySelectorAll('select, fieldset');
  var makeFilterActive = window.filter.activate;

  var mapSize = {
    yMin: 130,
    yMax: 630,
    xMin: 0,
    xMax: 1200
  };

  function onDataLoad(responseData) {
    makeFilterActive(responseData);
    var pinsMarkup = window.pin.initRenderList(responseData);
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
    enable: enableMap,
    disable: disableMap,
    onDataLoad: onDataLoad,
    pinsContainer: pinsContainer
  };
})();
