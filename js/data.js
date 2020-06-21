'use strict';

(function () {

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


  function createAdvert(index) {
    var yLocation = window.util.getRandomNumber(window.map.mapSize.Y_MIN, window.map.mapSize.Y_MAX);
    var xLocation = window.util.getRandomNumber(window.map.mapSize.X_MIN, window.map.mapSize.X_MAX);
    var addressString = xLocation + ', ' + yLocation;
    var advert = {
      'id': (index + 1),
      'author': {
        'avatar': 'img/avatars/user0' + (index + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок объявления ' + (index + 1),
        'address': addressString,
        'price': window.util.getRandomNumber(price.MIN, price.MAX),
        'type': window.util.getRandomElement(window.data.advertAttributes.TYPE_OF_RESIDENCE),
        'rooms': window.util.getRandomNumber(roomNumber.MIN, roomNumber.MAX),
        'guests': window.util.getRandomNumber(guestNumber.MIN, guestNumber.MAX),
        'checkin': window.util.getRandomElement(window.data.advertAttributes.CHEKING_TIME),
        'checkout': window.util.getRandomElement(window.data.advertAttributes.CHEKING_TIME),
        'features': window.util.getRandomArrayLength(window.data.advertAttributes.FEATURES),
        'description': 'Описание объявления ' + (index + 1),
        'photos': window.util.getRandomArrayLength(window.data.advertAttributes.PHOTOS),
      },
      'location': {
        'x': xLocation,
        'y': yLocation,
      }
    };
    return advert;
  }

  function createAdverts(count) {
    var adverts = [];
    for (var i = 0; i < count; i++) {
      adverts.push(createAdvert(i));
    }
    return adverts;
  }

  window.data = {
    advertAttributes: advertAttributes,
    createAdverts: createAdverts
  };

})();
