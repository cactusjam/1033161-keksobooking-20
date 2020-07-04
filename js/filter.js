'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFieldsets = filterForm.querySelectorAll('fieldset');
  var typeOfHouse = document.querySelector('#housing-type');
  var adverts = [];
  var map = document.querySelector('.map');

  function getAds(ads) {
    adverts = ads;
  }

  function removeAd() {
    var adElement = map.querySelector('.map__card');
    if (adElement) {
      adElement.remove();
    }
  }

  function onChange() {
    removeAd();
  }

  function onHousingTypeChange(evt) {
    var selectedType = evt.target.value;
    var filteredAds = adverts;
    if (selectedType !== 'any') {
      filteredAds = adverts.filter(function (ad) {
        return ad.offer.type === selectedType;
      });
    }
    window.pin.remove();

    var pinsMarkup = window.pin.renderList(filteredAds);
    window.map.pinsContainer.appendChild(pinsMarkup);
  }

  function makeFilterFormActive(ads) {
    window.util.toggleElementsDisabled(filterSelects, false);
    window.util.toggleElementsDisabled(filterFieldsets, false);
    getAds(ads);

    typeOfHouse.addEventListener('change', onHousingTypeChange);
    filterForm.addEventListener('change', onChange);
  };

  function makeFilterFormInactive() {
    filterForm.reset();
    window.util.toggleElementsDisabled(filterSelects, true);
    window.util.toggleElementsDisabled(filterFieldsets, true);

    typeOfHouse.removeEventListener('change', onHousingTypeChange);
    filterForm.removeEventListener('change', onChange);
  };

  window.filter = {
    activate: makeFilterFormActive,
    deactivate: makeFilterFormInactive
  };
})();
