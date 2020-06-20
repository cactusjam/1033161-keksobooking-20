'use strict';

var ADV_COUNT = 8;


var advertAttributes = {
  TYPE_OF_RESIDENCE: ['palace', 'flat', 'house', 'bungalo'],
  CHEKING_TIME: ['12: 00', '13: 00', '14: 00'],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ]
};

var pinSize = {
  HEIGHT: 70,
  WIDTH: 50
};

var price = {
  MIN: 500,
  MAX: 10000
};

var roomNumber = {
  MIN: 1,
  MAX: 4
};

var guestNumber = {
  MIN: 1,
  MAX: 6
};

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

var mapPinMain = {
  WIDTH: 65,
  HEIGHT: 65,
  POINTER: 22
};

var map = document.querySelector('.map');
var pinsContainer = document.querySelector('.map__pins');
var mapFilterContainer = document.querySelector('.map__filters-container');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var mainPin = document.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');

var mapItems = mapFilters.querySelectorAll('select, fieldset');
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

var mapSize = {
  Y_MIN: 130,
  Y_MAX: 630,
  X_MIN: 0,
  X_MAX: pinsContainer.offsetWidth
};

houseType.addEventListener('change', onHouseTypeChange);

function onHouseTypeChange(event) {
  var target = event.target;
  var amount = placeType[target.value].minPrice;
  rentPrice.min = amount;
  rentPrice.placeholder = amount;
};

function createAdvert(index) {
  var yLocation = getRandomNumber(mapSize.Y_MIN, mapSize.Y_MAX);
  var xLocation = getRandomNumber(mapSize.X_MIN, mapSize.X_MAX);
  var addressString = xLocation + ', ' + yLocation;
  var advert = {
    'id': (index + 1),
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },
    'offer': {
      'title': 'Заголовок объявления ' + (index + 1),
      'address': addressString,
      'price': getRandomNumber(price.MIN, price.MAX),
      'type': getRandomElement(advertAttributes.TYPE_OF_RESIDENCE),
      'rooms': getRandomNumber(roomNumber.MIN, roomNumber.MAX),
      'guests': getRandomNumber(guestNumber.MIN, guestNumber.MAX),
      'checkin': getRandomElement(advertAttributes.CHEKING_TIME),
      'checkout': getRandomElement(advertAttributes.CHEKING_TIME),
      'features': getRandomArrayLength(advertAttributes.FEATURES),
      'description': 'Описание объявления ' + (index + 1),
      'photos': getRandomArrayLength(advertAttributes.PHOTOS),
    },
    'location': {
      'x': xLocation,
      'y': yLocation,
    }
  };
  return advert;
}

function getRandomArrayLength(array) {
  var newArrayLength = getRandomNumber(1, array.length);
  var newArray = [];

  while (newArrayLength > newArray.length) {
    var randomElement = getRandomElement(array);
    if (newArray.includes(randomElement) === false) {
      newArray.push(randomElement);
    }
  }
  return newArray;
}

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function createAdverts(count) {
  var adverts = [];
  for (var i = 0; i < count; i++) {
    adverts.push(createAdvert(i));
  }
  return adverts;
}

function createPin(adv) {
  var mapPin = pin.cloneNode(true);
  var pinImage = mapPin.querySelector('img');
  mapPin.dataset.id = adv.id;
  mapPin.style.left = adv.location.x - pinSize.WIDTH + 'px';
  mapPin.style.top = adv.location.y - pinSize.HEIGHT + 'px';
  pinImage.alt = adv.offer.title;
  pinImage.src = adv.author.avatar;
  fragment.appendChild(mapPin);
}

document.addEventListener('click', pinClickHandler);

function pinClickHandler(event) {
  var target = event.target;
  var isClickOnPin = target.classList.contains('map__pin');
  var closestPin = target.closest('.map__pin');
  var id;
  if (isClickOnPin) {
    id = target.dataset.id;
  }
  if (closestPin) {
    id = closestPin.dataset.id;
  }
  if (id) {
    var targetAdv = offerList.find(function (adv) {
      return adv.id === Number(id);
    });
    removeCard();
    renderAdvertCard(targetAdv);
  }
}

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

function renderAdvertCard(advertData) {
  var cardElement = cardTemplate.cloneNode(true);
  var popupClose = cardElement.querySelector('.popup__close');
  cardElement.querySelector('.popup__avatar').src = advertData.author.avatar;
  cardElement.querySelector('.popup__title').textContent = advertData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advertData.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = placeType[advertData.offer.type].label;
  cardElement.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advertData.offer.description;
  addCardPhotos(cardElement, advertData);
  filterFeatures(cardElement, advertData);
  mapFilterContainer.insertAdjacentElement('beforebegin', cardElement);

  popupClose.addEventListener('click', function () {
    removeCard();
  });
}

function filterFeatures(cardElement, advertData) {
  var popupFeatures = cardElement.querySelector('.popup__features');
  var featuresFragment = document.createDocumentFragment();

  if (advertData.offer.features.length) {
    popupFeatures.innerHTML = '';

    for (var i = 0; i < advertData.offer.features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList = 'popup__feature popup__feature--' + advertData.offer.features[i];
      featuresFragment.appendChild(featureItem);
    }
    popupFeatures.appendChild(featuresFragment);
  } else {
    popupFeatures.remove();
  }
}

function addCardPhotos(cardElement, advertData) {
  var cardsPhotoCollection = cardElement.querySelector('.popup__photos');
  var popupPhoto = cardElement.querySelector('.popup__photo');
  popupPhoto.src = advertData.offer.photos[0];

  for (var i = 1; i < advertData.offer.photos.length; i++) {
    var newPhotoImg = popupPhoto.cloneNode(true);
    newPhotoImg.src = advertData.offer.photos[i];
    cardsPhotoCollection.appendChild(newPhotoImg);
  }
}

function addFormListener() {
  adFormSubmit.addEventListener('click', adFormSubmitClick);
}

function removeFormListener() {
  adFormSubmit.removeEventListener('click', adFormSubmitClick);
}

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    enableForm();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (isEnterKey(evt)) {
    enableForm();
  }
});

function toggleElementsDisabled(array, state) {
  array.forEach(function (select) {
    select.disabled = state;
  });
}

function addressCoords(coords) {
  adFormAddress.value = Math.ceil(coords.x) + ', ' + Math.ceil(coords.y);
};

function getMapPinMainCoords(active) {
  var pointerCoord = active === true ? mapPinMain.HEIGHT / 2 + mapPinMain.POINTER : 0;
  var coordX = mainPin.offsetLeft + mapPinMain.WIDTH / 2;
  var coordY = mainPin.offsetTop + mapPinMain.HEIGHT / 2 + pointerCoord;

  return {
    x: coordX,
    y: coordY
  };
}

function enableForm() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  toggleElementsDisabled(adFormFieldset, false);
  toggleElementsDisabled(mapItems, false);
  addressCoords(getMapPinMainCoords(true));
  pinsContainer.appendChild(fragment);
  addFormListener();
}

function disableForm() {
  toggleElementsDisabled(adFormFieldset, true);
  toggleElementsDisabled(mapItems, true);
  addressCoords(getMapPinMainCoords(false));
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

var offerList = createAdverts(ADV_COUNT);
offerList.forEach(function (elem) {
  createPin(elem);
});

function removeCard() {
  var card = document.querySelector('.popup');
  if (card) {
    map.removeChild(card);
  }
}

function isEscKey(evt) {
  return evt.key === 'Escape';
}

function isEnterKey(evt) {
  return evt.key === 'Enter';
}

document.addEventListener('keydown', function (evt) {
  if (isEscKey(evt)) {
    removeCard();
  }
});

timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});
