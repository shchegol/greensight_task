import Tabs from './tabs';
// import Map from './map';

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  initMap();
});

function initTabs() {
  let tabs = document.getElementById('tabs');
  new Tabs(tabs);
}

function initMap() {
  let pointStyle = {
    iconLayout: 'default#image',
    iconImageHref: 'static/svg/point.svg',
    iconImageSize: [32, 44],
    iconImageOffset: [-16, -44],
  };

  ymaps.ready(function() {

    let myMap = new ymaps.Map('map', {
      center: [55.801131, 37.508167],
      zoom: 9,
    }, {
      searchControlProvider: 'yandex#search',
    });

    let point1 = new ymaps.Placemark([55.801131, 37.508167], {
      hintContent: 'Пункт Выдачи заказов Песчаная улица, дом 13',
    }, pointStyle);

    let point2 = new ymaps.Placemark([55.757556, 37.651592], {
      hintContent: 'Пункт Выдачи заказов Подсосенский переулок, 11',
    }, pointStyle);

    myMap.geoObjects.add(point1).add(point2);
  });
}