'use strict';

(function () {

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

  function toggleElementsDisabled(array, state) {
    array.forEach(function (select) {
      select.disabled = state;
    });
  }

  function isEscKey(evt) {
    return evt.key === 'Escape';
  }

  function isEnterKey(evt) {
    return evt.key === 'Enter';
  }

  var setRemoveOnclick = function (element) {
    document.addEventListener('click', function () {
      element.remove();
    });
  };

  function setCloseOnEsc(element) {
    document.addEventListener('keydown', function (evt) {
      if (window.util.isEscKey(evt)) {
        element.remove();
      }
    });
  }

  window.util = {
    getRandomArrayLength: getRandomArrayLength,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    toggleElementsDisabled: toggleElementsDisabled,
    isEscKey: isEscKey,
    isEnterKey: isEnterKey,
    setRemoveOnclick: setRemoveOnclick,
    setCloseOnEsc: setCloseOnEsc
  };
})();
