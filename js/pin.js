'use strict';

(function () {

  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var MAX_RENDERED_PINS_COUNT = 5;

  var pinSize = {
    HEIGHT: 70,
    WIDTH: 50
  };

  var mapPinMain = {
    WIDTH: mainPin.offsetWidth,
    HEIGHT: 65,
    POINTER: 22,
    TOTAL_HEIGHT: 84,
    START_LEFT: 570,
    START_TOP: 375
  };

  function createPin(adv) {
    var mapPin = pin.cloneNode(true);
    var pinImage = mapPin.querySelector('img');
    mapPin.dataset.id = adv.id;
    mapPin.style.left = adv.location.x - pinSize.WIDTH + 'px';
    mapPin.style.top = adv.location.y - pinSize.HEIGHT + 'px';
    pinImage.alt = adv.offer.title;
    pinImage.src = adv.author.avatar;
    return mapPin;
  }

  function renderPins(offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_RENDERED_PINS_COUNT; i++) {
      if (offers[i]) {
        var createdPin = createPin(offers[i]);
        fragment.appendChild(createdPin);
      }
    }
    return fragment;
  }

  function removePins() {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
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
      var targetAdv = window.map.offers.find(function (adv) {
        return adv.id === Number(id);
      });
      window.card.remove();
      window.card.render(targetAdv);
    }
  }

  function centerTheMainPin() {
    mainPin.style.left = mapPinMain.START_LEFT + 'px';
    mainPin.style.top = mapPinMain.START_TOP + 'px';
  }

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      window.form.enable();
      window.map.enable();

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

        var mainPinPosition = {
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };

        var Border = {
          TOP: window.map.size.yMin - mapPinMain.TOTAL_HEIGHT,
          BOTTOM: window.map.size.yMax - mapPinMain.TOTAL_HEIGHT,
          LEFT: window.map.size.xMin,
          RIGHT: window.map.size.xMax - mapPinMain.WIDTH
        };

        if (mainPinPosition.x >= Border.LEFT && mainPinPosition.x <= Border.RIGHT) {
          mainPin.style.left = mainPinPosition.x + 'px';
        }
        if (mainPinPosition.y >= Border.TOP && mainPinPosition.y <= Border.BOTTOM) {
          mainPin.style.top = mainPinPosition.y + 'px';
        }
        window.form.addressCoords(getMapPinMainCoords(true));
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (window.util.isEnterKey(evt)) {
      window.form.enable();
      window.map.enable();
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
    сoords: getMapPinMainCoords,
    remove: removePins,
    mainPin: mainPin,
    renderList: renderPins,
    centerTheMainPin: centerTheMainPin
  };
})();
