'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var adFormAddress = adForm.querySelector('#address');
  var adFormRooms = adForm.querySelector('#room_number');
  var adFormGuests = adForm.querySelector('#capacity');
  var houseType = adForm.querySelector('#type');
  var rentPrice = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var mapItems = window.map.mapFilters.querySelectorAll('select, fieldset');

  var placeType = {
    flat: {
      label: 'Квартира',
      minPrice: 1000
    },
    bungalo: {
      label: 'Бунгало',
      minPrice: 0
    },
    house: {
      label: 'Дом',
      minPrice: 5000
    },
    palace: {
      label: 'Дворец',
      minPrice: 10000
    }
  };

  houseType.addEventListener('change', onHouseTypeChange);

  function onHouseTypeChange(event) {
    var target = event.target;
    var amount = placeType[target.value].minPrice;
    rentPrice.min = amount;
    rentPrice.placeholder = amount;
  }

  function addFormListener() {
    adFormSubmit.addEventListener('click', adFormSubmitClick);
  }

  function removeFormListener() {
    adFormSubmit.removeEventListener('click', adFormSubmitClick);
  }

  function addressCoords(coords) {
    adFormAddress.value = Math.ceil(coords.x) + ', ' + Math.ceil(coords.y);
  }

  function enableForm() {
    window.map.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.toggleElementsDisabled(adFormFieldset, false);
    window.util.toggleElementsDisabled(mapItems, false);
    addressCoords(window.pin.getMapPinMainCoords(true));
    window.map.pinsContainer.appendChild(window.pin.fragment);
    addFormListener();
  }

  function disableForm() {
    window.util.toggleElementsDisabled(adFormFieldset, true);
    window.util.toggleElementsDisabled(mapItems, true);
    addressCoords(window.pin.getMapPinMainCoords(false));
    removeFormListener();
  }

  disableForm();

  function checkRoomValidity() {
    var roomsValue = Number(adFormRooms.value);
    var guestsValue = Number(adFormGuests.value);
    if (roomsValue === 100 && guestsValue !== 0) {
      adFormGuests.setCustomValidity('Возможен только вариант размещения "Не для гостей"');
    } else if (guestsValue > roomsValue) {
      adFormGuests.setCustomValidity('Недостаточно спальных мест для указанного количества гостей');
    } else if (guestsValue === 0 && roomsValue !== 100) {
      adFormGuests.setCustomValidity('Минимальное количество гостей - 1');
    } else {
      adFormGuests.setCustomValidity('');
    }
  };

  function adFormSubmitClick() {
    checkRoomValidity();
  }

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  window.form = {
    enableForm: enableForm,
    placeType: placeType
  };
})();
