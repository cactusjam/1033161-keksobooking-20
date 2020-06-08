'use strict';
var pinsContainer = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilterContainer = document.querySelector('.map__filters-container');
var COUNT = 8;
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
  MAP_Y_MIN: 130,
  MAP_Y_MAX: 630,
  MAP_X_MIN: 0,
  MAP_X_MAX: pinsContainer.offsetWidth
};

var price = {
  PRICE_MIN: 500,
  PRICE_MAX: 10000
};

var roomNumber = {
  MIN_ROOM: 1,
  MAX_ROOM: 4
};

var guestNumber = {
  MIN_GUEST: 1,
  MAX_GUEST: 6
};

var placeType = {
  FLAT: 'Квартира',
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец'
};

function createAdvert(index) {
  var yLocation = getRandomNumber(mapSize.MAP_Y_MIN, mapSize.MAP_Y_MAX);
  var xLocation = getRandomNumber(mapSize.MAP_X_MIN, mapSize.MAP_X_MAX);
  var addressString = xLocation + ', ' + yLocation;
  var advert = {
    'author': {
      'avatar': getAvatarPath(index)
    },
    'offer': {
      'title': 'Заголовок объявления ' + (index + 1),
      'address': addressString,
      'price': getRandomNumber(price.PRICE_MIN, price.PRICE_MAX),
      'type': getRandomElement(advertAttributes.TYPE_OF_RESIDENCE),
      'rooms': getRandomNumber(roomNumber.MIN_ROOM, roomNumber.MAX_ROOM),
      'guests': getRandomNumber(guestNumber.MIN_GUEST, guestNumber.MAX_GUEST),
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

function getAvatarPath(index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
}

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function createAdvertCollection() {
  var adverts = [];
  for (var i = 0; i < COUNT; i++) {
    adverts.push(createAdvert(i));
  }
  return adverts;
}
var advertCollection = createAdvertCollection();

map.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');

function createPin(adv) {
  var mapPin = pin.cloneNode(true);
  var pinImage = mapPin.querySelector('img');
  mapPin.style.left = adv.location.x - pinSize.WIDTH + 'px';
  mapPin.style.top = adv.location.y - pinSize.HEIGHT + 'px';
  pinImage.alt = adv.offer.title;
  pinImage.src = adv.author.avatar;
  return mapPin;
}

function renderMapPins() {
  var fragment = document.createDocumentFragment();
  var createAdv = createAdvertCollection();
  for (var i = 0; i < COUNT; i++) {
    fragment.appendChild(createPin(createAdv[i]));
  }
  pinsContainer.appendChild(fragment);
}
renderMapPins();


var firstAdvert = advertCollection[0];
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
  filterFeatures(cardElement, advertData);
  cardElement.querySelector('.popup__description').textContent = advertData.offer.description;
  addCardPhotos(cardElement, advertData);
  mapFilterContainer.insertAdjacentElement('beforebegin', cardElement);
  return cardElement;
};

function filterFeatures(cardElement, advertData) {
  var cardFeatureCollection = cardElement.querySelectorAll('.popup__feature');
  for (var i = 0; i < cardFeatureCollection.length; i++) {
    var liElement = cardFeatureCollection[i];
    var featurePresent = false;

    for (var advI = 0; advI < advertData.offer.features.length; advI++) {
      if (liElement.className.includes(advertData.offer.features[advI]) === true) {
        featurePresent = true;
      }
    }

    if (featurePresent === false) {
      liElement.remove();
    }
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

renderAdvertCard(firstAdvert);
