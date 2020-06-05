'use strict';
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
  ],
  COUNT: 8,
  GAP_PIN_Y = 70,
  GAP_PIN_X = 50
};

var offsetWidth = document.querySelector('.map__pins').offsetWidth;

function createAdvert(i) {
  var yLocation = getRandomNumber(130, 630);
  var xLocation = getRandomNumber(0, offsetWidth);
  var addressString = xLocation + ', ' + yLocation;
  var advert = {
    'author': {
      'avatar': getAvatarPath(i)
    },
    'offer': {
      'title': 'Заголовок объявления',
      'address': addressString,
      'price': getRandomNumber(500, 10000),
      'type': getRandomElement(advertAttributes.TYPE_OF_RESIDENCE),
      'rooms': getRandomNumber(1, 4),
      'guests': getRandomNumber(1, 6),
      'checkin': getRandomElement(advertAttributes.CHEKING_TIME),
      'checkout': getRandomElement(advertAttributes.CHEKING_TIME),
      'features': getRandomElement(advertAttributes.FEATURES),
      'description': 'Описание объявления',
      'photos': getRandomElement(advertAttributes.PHOTOS),
    },
    'location': {
      'x': xLocation,
      'y': yLocation,
    }
  };
  return advert;
}

function getAvatarPath(i) {
  var avatars = '0' + (i + 1);
  return 'img/avatars/user' + avatars + '.png';
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
  for (var i = 0; i < advertAttributes.COUNT; i++) {
    adverts.push(createAdvert(i));
  }
  return adverts;
}
createAdvertCollection();


document.querySelector('.map').classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');

function createPin(adv) {
  var mapPin = pin.cloneNode(true);
  mapPin.style.left = adv.location.x - GAP_PIN_X + 'px';
  mapPin.style.top = adv.location.y - GAP_PIN_Y + 'px';
  mapPin.querySelector('img').alt = adv.offer.title;
  mapPin.querySelector('img').src = adv.author.avatar;
  return mapPin;
}

function renderMapPin() {
  var fragment = document.createDocumentFragment();
  var createAdv = createAdvertCollection();
  for (var i = 0; i < advertAttributes.COUNT; i++) {
    fragment.appendChild(createPin(createAdv[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
}
renderMapPin();
