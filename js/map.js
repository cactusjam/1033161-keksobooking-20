'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapFilters = document.querySelector('.map__filters');


  var mapSize = {
    Y_MIN: 130,
    Y_MAX: 630,
    X_MIN: 0,
    X_MAX: pinsContainer.offsetWidth
  };

  function removeCard() {
    var card = document.querySelector('.map .popup');
    if (card) {
      document.removeEventListener('keydown', window.util.isEscKey);
      map.removeChild(card);
    }
  }

  window.map = {
    mapSize: mapSize,
    mapFilterContainer: mapFilterContainer,
    map: map,
    pinsContainer: pinsContainer,
    mapFilters: mapFilters,
    removeCard: removeCard
  };
})();
