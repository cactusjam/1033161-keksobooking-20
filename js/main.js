'use strict';
var pinsContainer = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilterContainer = document.querySelector('.map__filters-container');
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

var mapSize = {
  Y_MIN: 130,
  Y_MAX: 630,
  X_MIN: 0,
  X_MAX: pinsContainer.offsetWidth
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
  FLAT: 'Квартира',
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец'
};

function createAdvert(index) {
  var yLocation = getRandomNumber(mapSize.Y_MIN, mapSize.Y_MAX);
  var xLocation = getRandomNumber(mapSize.X_MIN, mapSize.X_MAX);
  var addressString = xLocation + ', ' + yLocation;
  var advert = {
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

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

function createPin(adv) {
  var mapPin = pin.cloneNode(true);
  var pinImage = mapPin.querySelector('img');
  mapPin.style.left = adv.location.x - pinSize.WIDTH + 'px';
  mapPin.style.top = adv.location.y - pinSize.HEIGHT + 'px';
  pinImage.alt = adv.offer.title;
  pinImage.src = adv.author.avatar;

  mapPin.addEventListener('click', function () {
    renderAdvertCard(adv);
  });
  fragment.appendChild(mapPin);
}

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var renderAdvertCard = function (advertData) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = advertData.author.avatar;
  cardElement.querySelector('.popup__title').textContent = advertData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advertData.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = placeType[advertData.offer.type.toUpperCase()];
  cardElement.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advertData.offer.description;
  addCardPhotos(cardElement, advertData);
  filterFeatures(cardElement, advertData);
  mapFilterContainer.insertAdjacentElement('beforebegin', cardElement);
  return cardElement;
};

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

var mapPinMain = {
  WIDTH: 65,
  HEIGHT: 65,
  POINTER: 22
};

var mainPin = document.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var mapItems = mapFilters.querySelectorAll('select, fieldset');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var adFormSubmit = adForm.querySelector('.ad-form__submit');
var adFormAddress = adForm.querySelector('#address');
var adFormRooms = adForm.querySelector('#room_number');
var adFormGuests = adForm.querySelector('#capacity');
// var adFormTitle = adForm.querySelector('#title');

var addFormListener = function () {
  adFormSubmit.addEventListener('click', adFormSubmitClick);
};

var removeFormListener = function () {
  adFormSubmit.removeEventListener('click', adFormSubmitClick);
};

mainPin.addEventListener('mousedown', function (event) {
  if (event.which === 1) {
    enableForm();
  }
});

mainPin.addEventListener('keydown', function () {
  enableForm();
});

var toggleElementsDisabled = function (array, state) {
  array.forEach(function (select) {
    select.disabled = state;
  });
};

var addressCoords = function (coords) {
  adFormAddress.value = Math.ceil(coords.x) + ', ' + Math.ceil(coords.y);
};

var getMapPinMainCoords = function (active) {
  var pointerCoord = active === true ? mapPinMain.HEIGHT / 2 + mapPinMain.POINTER : 0;
  var coordX = mainPin.offsetLeft + mapPinMain.WIDTH / 2;
  var coordY = mainPin.offsetTop + mapPinMain.HEIGHT / 2 + pointerCoord;

  return {
    x: coordX,
    y: coordY
  };
};

var enableForm = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  toggleElementsDisabled(adFormFieldset, false);
  toggleElementsDisabled(mapItems, false);
  addressCoords(getMapPinMainCoords(true));
  pinsContainer.appendChild(fragment);
  addFormListener();
};

var disableForm = function () {
  toggleElementsDisabled(adFormFieldset, true);
  toggleElementsDisabled(mapItems, true);
  addressCoords(getMapPinMainCoords(false));
  removeFormListener();
};

disableForm();

var checkRoomValidity = function () {
  if (adFormRooms.value === '100' && adFormGuests.value !== '0') {
    adFormGuests.setCustomValidity('Возможен только вариант размещения "Не для гостей"');
  } else if (adFormGuests.value > adFormRooms.value) {
    adFormGuests.setCustomValidity('Недостаточно спальных мест для указанного количества гостей');
  } else if (adFormGuests.value === '0' && adFormRooms.value !== '100') {
    adFormGuests.setCustomValidity('Минимальное количество гостей - 1');
  } else {
    adFormGuests.setCustomValidity('');
  }
};

var adFormSubmitClick = function () {
  checkRoomValidity();
};

var offerList = createAdverts(ADV_COUNT);
offerList.forEach(function (elem) {
  createPin(elem);
});
