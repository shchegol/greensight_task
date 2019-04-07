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
      isPhone: document.body.clientWidth < 768,
    };

    for (let option in options) {
      if (!options.hasOwnProperty(option)) continue;

      if (defaults[option] === undefined) {
        console.log(`Oops! Map do not have property: ${option}`);
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

  static isTouchDevice() {
    return ('ontouchstart' in window);
  }

  init() {
    console.log('init map');

    ymaps.ready(() => {
      this.map = new ymaps.Map(this.elem, {
        center: [55.753674, 37.619932],
        controls: ['zoomControl'],
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
      this.changeScrollAbility(Map.isTouchDevice());
    });
  }

  update(options) {
    console.log('update map', options);

    if (options !== undefined) {
      for (let option in options) {

        if (!options.hasOwnProperty(option)) continue;

        if (this.options[option] === undefined) {
          console.log(`Oops! Map do not have property: ${option}`);
          return this;
        }

        this.options[option] = options[option];
      }
    }

    this.map.container.fitToViewport();
    this.changeScrollAbility(Map.isTouchDevice());

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

  changeScrollAbility(state) {
    console.log('changeScrollAbility', state);
    let behaviors = this.map.behaviors;

    if (state) {
      behaviors.disable('scrollZoom');
      behaviors.disable('drag');
    } else {
      behaviors.enable('scrollZoom');
      behaviors.enable('drag');
    }
  }
}