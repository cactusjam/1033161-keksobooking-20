'use strict';

(function () {
  var ADV_COUNT = 8;

  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();

  var pinSize = {
    HEIGHT: 70,
    WIDTH: 50
  };

  var mapPinMain = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER: 22
  };

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

  var offerList = window.data.createAdverts(ADV_COUNT);
  offerList.forEach(function (elem) {
    createPin(elem);
  });

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
      window.map.removeCard();
      window.card.renderAdvertCard(targetAdv);
    }
  }

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      window.form.enableForm();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (window.util.isEnterKey(evt)) {
      window.form.enableForm();
    }
  });

  function getMapPinMainCoords(active) {
    var pointerCoord = active === true ? mapPinMain.HEIGHT / 2 + mapPinMain.POINTER : 0;
    var coordX = mainPin.offsetLeft + mapPinMain.WIDTH / 2;
    var coordY = mainPin.offsetTop + mapPinMain.HEIGHT / 2 + pointerCoord;

    return {
      x: coordX,
      y: coordY
    };
  }

  window.pin = {
    getMapPinMainCoords: getMapPinMainCoords,
    fragment: fragment
  };
})();
