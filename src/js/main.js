import Tab      from './tab';
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

document.addEventListener('DOMContentLoaded', () => {
  const tabsElement = document.getElementById('tabs');
  const mapElement = document.getElementById('map');
  const breakpoint = 768;

  const tabs = new Tab(tabsElement);
  const map = new Map(mapElement, {
    pickups: pickups,
  });

  tabsElement.addEventListener('changeTab', (event) => {
    if (event.detail.activeTab === 1) {
      map.update({isPhone: checkBreakpoint(breakpoint)});
    }
  });

  window.onresize = debounce(() => {
    let isPhone = checkBreakpoint(breakpoint);

    tabs.update({isPhone: isPhone});
    map.update({isPhone: isPhone});
  }, 200);
});

function checkBreakpoint(breakpoint) {
  return document.body.clientWidth < breakpoint
}