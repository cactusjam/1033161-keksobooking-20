'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var defaultAvatar = avatarPreview.src;
  var imageChooser = document.querySelector('#images');
  var imagePreview = document.querySelector('.ad-form__photo');

  function isTrueImg(file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  }

  function loadPhotoHandler() {
    var file = imageChooser.files[0];

    if (isTrueImg(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.style = 'max-width: 100%;';
        imagePreview.appendChild(img);
      });

      reader.readAsDataURL(file);
    }
  }

  function loadAvatarHandler() {
    var file = avatarChooser.files[0];

    if (isTrueImg(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function activateImgLoader() {
    imageChooser.addEventListener('change', loadPhotoHandler);
    avatarChooser.addEventListener('change', loadAvatarHandler);
  }

  function disableImgLoader() {
    imageChooser.removeEventListener('change', loadPhotoHandler);
    avatarChooser.removeEventListener('change', loadAvatarHandler);
    avatarPreview.src = defaultAvatar;
    imagePreview.innerHTML = '';
  };

  window.imgLoader = {
    activate: activateImgLoader,
    disable: disableImgLoader
  };
})();
