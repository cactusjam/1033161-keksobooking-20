'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  function createXhr(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

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
    return xhr;
  }

  function load(onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('GET', URL_GET);
    xhr.send(null);
  }

  function upload(data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    upload: upload
  };
})();
