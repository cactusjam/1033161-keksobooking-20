'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var defaultAvatar = avatarPreview.src;
  var imageChooser = document.querySelector('#images');
  var imagePreview = document.querySelector('.ad-form__photo');

  var isTrueImg = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  function loadPhoto() {
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

  function loadAvatar() {
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
    imageChooser.addEventListener('change', loadPhoto);
    avatarChooser.addEventListener('change', loadAvatar);
  }

  var disableImgLoader = function () {
    imageChooser.removeEventListener('change', loadPhoto);
    avatarChooser.removeEventListener('change', loadAvatar);
    avatarPreview.src = defaultAvatar;
    imagePreview.innerHTML = '';
  };

  window.imgLoader = {
    activate: activateImgLoader,
    disable: disableImgLoader
  };
})();
