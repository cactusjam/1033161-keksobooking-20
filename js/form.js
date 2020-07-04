'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var buttonReset = adForm.querySelector('.ad-form__reset');
  var main = document.querySelector('main');
  var adFormAddress = adForm.querySelector('#address');
  var adFormRooms = adForm.querySelector('#room_number');
  var adFormGuests = adForm.querySelector('#capacity');
  var houseType = adForm.querySelector('#type');
  var rentPrice = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var successfulPopupTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

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
    if (adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
      window.util.toggleElementsDisabled(adFormFieldset, false);
      addressCoords(window.pin.сoords(true));
      addFormListener();
    }
  }

  function disableForm() {
    addressCoords(window.pin.сoords(false));
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
      window.util.toggleElementsDisabled(adFormFieldset, true);
      removeFormListener();
      adForm.reset();
    }
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
  }

  function adFormSubmitClick() {
    checkRoomValidity();
  }

  function createSuccessfulSubmitForm() {
    var successMessage = successfulPopupTemplate.cloneNode(true);
    main.appendChild(successMessage);
    window.util.onDocumentClick(successMessage);
    window.util.onDocumentKeydown(successMessage);
  }

  function createErrorSubmitForm() {
    var errorMessage = errorPopupTemplate.cloneNode(true);
    main.appendChild(errorMessage);

    window.util.onDocumentClick(errorMessage);
    window.util.onDocumentKeydown(errorMessage);
  }

  function onFormSendSuccess() {
    createSuccessfulSubmitForm();
    disableForm();
    window.map.disable();
  }

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(
        new FormData(adForm),
        onFormSendSuccess,
        createErrorSubmitForm
    );
    evt.preventDefault();
  });

  buttonReset.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which === 1) {
      disableForm();
      window.map.disable();
    }
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  window.form = {
    enable: enableForm,
    placeType: placeType,
    addressCoords: addressCoords
  };
})();
