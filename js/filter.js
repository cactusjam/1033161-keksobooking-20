'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFieldsets = filterForm.querySelectorAll('fieldset');
  var typeOfHouse = document.querySelector('#housing-type');
  var adverts = [];

  function getAdvs(advs) {
    adverts = advs;
  }

  function onFilteringHouseType(evt) {
    var selectedType = evt.target.value;
    var filteredAdvs = adverts;
    if (selectedType !== 'any') {
      filteredAdvs = adverts.filter(function (adv) {
        return adv.offer.type === selectedType;
      });
    }
    window.pin.remove();

    var pinsMarkup = window.pin.renderList(filteredAdvs);
    window.map.pinsContainer.appendChild(pinsMarkup);
  }

  function makeFilterFormActive(advs) {
    window.util.toggleElementsDisabled(filterSelects, false);
    window.util.toggleElementsDisabled(filterFieldsets, false);
    getAdvs(advs);

    typeOfHouse.addEventListener('change', onFilteringHouseType);
    filterForm.addEventListener('change', window.card.remove);
  }

  function makeFilterFormInactive() {
    filterForm.reset();
    window.util.toggleElementsDisabled(filterSelects, true);
    window.util.toggleElementsDisabled(filterFieldsets, true);

    typeOfHouse.removeEventListener('change', onFilteringHouseType);
    filterForm.removeEventListener('change', window.card.remove);
  }

  window.filter = {
    activate: makeFilterFormActive,
    deactivate: makeFilterFormInactive
  };
})();
