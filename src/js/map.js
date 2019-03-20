export default class Map {
  constructor(elem, options = {}) {
    let defaults = {
      coords: [],
      style: {
        iconLayout: 'default#image',
        iconImageHref: 'static/svg/point.svg',
        iconImageSize: [32, 44],
        iconImageOffset: [-16, -44],
      }
    };

    for (let option in options) {

      if (!options.hasOwnProperty(option)) continue;

      if (defaults[option] === undefined) {
        console.log(`Oops! Tabs do not have property: ${option}`);
        return this;
      }

      defaults[option] = options[option];
    }

    this.elem = elem;
    this.map = {};
    this.options = defaults;
    this.collection = {};
    this.centerAndZoom = {};

    this.init()
  }

  init() {
    console.log('init PickupsMap');

    ymaps.ready(() => {
      this.map = new ymaps.Map(this.elem, {
        center: [55.801131, 37.508167],
        zoom: 9,
      }, {
        searchControlProvider: 'yandex#search',
      });

      this.collection = new ymaps.GeoObjectCollection(null, this.options.style);



      for (let i = 0, max = this.options.coords.length; i < max; i++) {
        this.collection.add(new ymaps.Placemark(this.options.coords[i]));
      }

      this.map.geoObjects.add(this.collection);
    });
  }

  update() {
    console.log('update PickupsMap');
    this.centerAndZoom = ymaps.util.bounds.getCenterAndZoom(
        this.collection.getBounds(),
        this.map.container.getSize(),
        this.map.options.get('projection'),
    );

    console.log(this.centerAndZoom)

    this.map.setCenter(this.centerAndZoom.center, this.centerAndZoom.zoom);
  }
}