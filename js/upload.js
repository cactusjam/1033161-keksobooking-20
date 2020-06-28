'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var statusCode = {
    OK: 200
  };
  var timeoutInMs = 10000;

  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = timeoutInMs;
    xhr.open('GET', URL);
    xhr.send(null);
  }

  window.upload = {
    load: load
  };
})();
