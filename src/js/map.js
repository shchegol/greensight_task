export default class Map {
  constructor(elem, options = {}) {
    let defaults = {
      pickups: [],
      style: {
        iconLayout: 'default#image',
        iconImageHref: 'static/svg/point.svg',
        iconImageSize: [32, 44],
        iconImageOffset: [-16, -44],
      },
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
    this.isSinglePickup = false;

    this.init();
  }

  init() {
    console.log('init PickupsMap');
    ymaps.ready(() => {
      this.map = new ymaps.Map(this.elem, {
        center: [55.753674, 37.619932],
        zoom: 12,
      });

      if (this.options.pickups.length > 1) {
        this.collection = new ymaps.GeoObjectCollection(null, this.options.style);

        for (let i = 0, max = this.options.pickups.length; i < max; i++) {
          this.collection.add(new ymaps.Placemark(this.options.pickups[i].coords));
        }
      } else {
        this.collection = new ymaps.Placemark(this.options.pickups[0].coords, null, this.options.style);
        this.isSinglePickup = true;
      }

      this.map.geoObjects.add(this.collection);
    });
  }

  update() {
    console.log('update PickupsMap');
    this.map.container.fitToViewport();

    if (!this.isSinglePickup) {
      this.centerAndZoom = ymaps.util.bounds.getCenterAndZoom(
          this.collection.getBounds(),
          this.map.container.getSize(),
          this.map.options.get('projection'),
      );

      this.map.setCenter(this.centerAndZoom.center, this.centerAndZoom.zoom - 1);
    } else {
      this.map.setCenter(this.options.pickups[0].coords, 17);
    }
  }
}