var advertAttributes = {
  COUNT: 8,
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
  TITLES: [
    'Уютное гнездышко для молодоженов',
    'Маленькая квартирка рядом с парком',
    'Небольшая лавочка в парке',
    'Императорский дворец в центре Токио',
    'Милейший чердачок',
    'Наркоманский притон',
    'Чёткая хата',
    'Стандартная квартира в центре'
  ]
};

function getAvatarPath(i) {
  var avatars = '0' + (i + 1);
  return 'img/avatars/user' + avatars + '.png'
}

function createAdvert(i) {
  var advert = {
    'author': {
      'avatar': getAvatarPath(i)
    },
    'offer': {
      'title': advertAttributes.TITLES[i],
      "address": ['600, 350', '500, 200', '400, 600'],
      "price": [100, 200, 300],
      'type': TYPE_OF_RESIDENCE.random(1, 4),
      "rooms": random(1, 4),
      "guests": random(1, 4),
      "checkin": CHEKING_TIME.random(1, 3),
      "checkout": CHEKING_TIME.random(1, 3),
      "features": ,
      "description": 'Описание объявления',
      "photos": ,
    },
    'location': {
      'x': xPosition,
      'y': yPosition,
    }
  };
  return advert;
};

function random(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

function createAdvertCollection() {
  var adverts = [];
  for (var i = 0; i < advertAttributes.COUNT; i++) {
    adverts.push(
      createAdvert(i)
    );
  }
  return adverts;
}
