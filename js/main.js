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

var advertisements = createAdverts(ADV_COUNT);

function renderMapPins(adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }
  pinsContainer.appendChild(fragment);
}
renderMapPins(advertisements);

var firstAdvert = advertisements[0];
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

renderAdvertCard(firstAdvert);
