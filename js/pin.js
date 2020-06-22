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
    WIDTH: mainPin.offsetWidth,
    HEIGHT: 65,
    POINTER: 22,
    TOTAL_HEIGHT: 84
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
  var MIN_Y = window.map.mapSize.Y_MIN - mapPinMain.TOTAL_HEIGHT;
  var MAX_Y = window.map.mapSize.Y_MAX - mapPinMain.TOTAL_HEIGHT;
  var MIN_X = window.map.mapSize.X_MIN;
  var MAX_X = window.map.mapSize.X_MAX - mapPinMain.WIDTH;

  function movePin(shift) {
    var coordMapY = mainPin.offsetTop - shift.y;
    var coordMapX = mainPin.offsetLeft - shift.x;
    if (coordMapY > MAX_Y) {
      coordMapY = MAX_Y;
    } else if (coordMapY < MIN_Y) {
      coordMapY = MIN_Y;
    }
    if (coordMapX > MAX_X) {
      coordMapX = MAX_X;
    } else if (coordMapX < MIN_X) {
      coordMapX = MIN_X;
    }
    mainPin.style.top = coordMapY + 'px';
    mainPin.style.left = coordMapX + 'px';
  }

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

        movePin(shift);
        getMapPinMainCoords();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.form.enableForm();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
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
