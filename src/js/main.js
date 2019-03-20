import Tabs       from './tabs';
import Map        from './map';
import {debounce} from './utils';

document.addEventListener('DOMContentLoaded', function() {
  let tabsElement = document.getElementById('tabs');
  let mapElement = document.getElementById('map');
  let map = new Map(mapElement, {
    coords: [
      [55.801131, 37.508167],
      [55.757556, 37.651592],
    ],
  });
  let tabs = new Tabs(tabsElement);
  let tabElem = tabs.getElem();
  // let isMapInit = false;

  tabElem.addEventListener('change', (event) => {
    // if (!isMapInit) {
    //   isMapInit = true;
    //
    //   map = new Map(mapElement, {
    //     coords: [
    //       [55.801131, 37.508167],
    //       [55.757556, 37.651592],
    //     ],
    //   });
    // }

    if (event.detail.activeTab !== 0) {
      setTimeout(() => {map.update();}, 1)
    }
  });

  window.onresize = debounce(() => {
    tabs.update();
  }, 200);
});