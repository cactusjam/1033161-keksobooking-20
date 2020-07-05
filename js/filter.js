'use strict';
(function () {
  var typeOfHouse = document.querySelector('#housing-type');

  function filterOffers(adverts) {
    var filteredAdvs = [];
    var selectedType = typeOfHouse.value;
    if (selectedType !== 'any') {
      filteredAdvs = adverts.filter(function (adv) {
        return adv.offer.type === selectedType;
      });
    } else {
      filteredAdvs = adverts;
    }
    return filteredAdvs;
  }

  function onFilterChange() {
    window.pin.remove();
    window.card.remove();
    var filteredAdvs = filterOffers(window.map.offers);
    window.map.updatePins(filteredAdvs);
  }

  typeOfHouse.addEventListener('change', onFilterChange);

  window.filter = {
    run: filterOffers,
    change: onFilterChange
  };
})();
