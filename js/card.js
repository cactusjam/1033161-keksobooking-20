'use strict';

(function () {

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  function renderAdvertCard(advertData) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupClose = cardElement.querySelector('.popup__close');
    cardElement.querySelector('.popup__avatar').src = advertData.author.avatar;
    cardElement.querySelector('.popup__title').textContent = advertData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advertData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advertData.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.form.placeType[advertData.offer.type].label;
    cardElement.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advertData.offer.description;
    addCardPhotos(cardElement, advertData);
    filterFeatures(cardElement, advertData);
    window.map.element.insertAdjacentElement('afterbegin', cardElement);

    popupClose.addEventListener('click', function () {
      removeCard();
    });
  }

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
    if (advertData.offer.photos.length) {
      popupPhoto.src = advertData.offer.photos[0];

      for (var i = 1; i < advertData.offer.photos.length; i++) {
        var newPhotoImg = popupPhoto.cloneNode(true);
        newPhotoImg.src = advertData.offer.photos[i];
        cardsPhotoCollection.appendChild(newPhotoImg);
      }
    } else {
      popupPhoto.remove();
    }
  }

  document.addEventListener('keydown', function (evt) {
    if (window.util.isEscKey(evt)) {
      removeCard();
    }
  });

  function removeCard() {
    var card = document.querySelector('.popup');
    if (card) {
      document.removeEventListener('keydown', window.util.isEscKey);
      card.remove();
    }
  }

  window.card = {
    render: renderAdvertCard,
    remove: removeCard,
    filterFeatures: filterFeatures
  };
})();
