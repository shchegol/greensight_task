import Tab       from './tab';
import Map        from './map';
import {debounce} from './utils';

(function() {
  const breakpoint = 768;
  let isPhone = false;
  let pickups = [
    {
      coords: [55.801131, 37.508167],
      title: 'Пункт Выдачи заказов Подсосенский переулок, 11',
    }, {
      coords: [55.757556, 37.651592],
      title: 'Пункт Выдачи заказов Песчаная улица, дом 13',
    },
  ];

  document.addEventListener('DOMContentLoaded', initAll);

  function initAll() {
    let tabElement     = document.getElementById('tabs'),
        mapElement      = document.getElementById('map'),
        tab            = new Tab(tabElement),
        tabFirstChange = true,
        map;

    tab.addEventListener('changeTab', () => {
      if (tabFirstChange) {
        map = new Map(mapElement, pickups, {
          style: {
            iconLayout: 'default#image',
            iconImageHref: 'static/svg/point.svg',
            iconImageSize: [32, 44],
            iconImageOffset: [-16, -44],
          },
        });

        tabFirstChange = false;
      }
    });

    window.onresize = debounce(() => {
      isPhone = checkBreakpoint(breakpoint);

      tab.update();
      map.rerender();

      // tab.update({isPhone: isPhone});
      // map.update({isPhone: isPhone});
    }, 200);

    document.removeEventListener('DOMContentLoaded', initAll);
  }

  function checkBreakpoint(breakpoint) {
    return document.body.clientWidth < breakpoint
  }
})();