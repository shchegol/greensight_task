import Tabs       from './tabs';
import Map        from './map';
import {debounce} from './utils';

// pickups data
let pickups = [
  {
    coords: [55.801131, 37.508167],
    title: 'Пункт Выдачи заказов Подсосенский переулок, 11',
  }, {
    coords: [55.757556, 37.651592],
    title: 'Пункт Выдачи заказов Песчаная улица, дом 13',
  }
];

document.addEventListener('DOMContentLoaded', function() {
  let tabsElement = document.getElementById('tabs');
  let mapElement = document.getElementById('map');
  let map = new Map(mapElement, {
    pickups: pickups,
  });
  let tabs = new Tabs(tabsElement);

  tabsElement.addEventListener('changeTab', (event) => {
    if (event.detail.activeTab === 1) {
      map.update();
    }
  });

  window.onresize = debounce(() => {
    tabs.update();
    map.update();
  }, 200);
});