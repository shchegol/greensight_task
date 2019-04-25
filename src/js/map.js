export default class Map {
  #defaults = {
    style: {},
    behaviors: {
      scrollZoom: false,
      drag: true,
    },
  };
  #isSinglePickup = false;
  #collection;
  #centerAndZoom = {
    center: [55.753674, 37.619932],
    zoom: 17,
  };
  #points;
  #elem;
  #map;

  options;

  constructor(elem, points, options) {
    if (!elem) {
      console.log('class Map must contain an element');
      return
    }

    if (Map.checkType(points) === 'array') {
      this.#points = points;
    }

    if (Map.checkType(options) === 'object') {
      this.#setOptions(this.#defaults, options);
    }

    this.#elem = elem;
    this.options = this.#defaults;
    this.#init();
  }

  #init() {
    ymaps.ready(() => {
      this.#map = new ymaps.Map(this.#elem, this.#centerAndZoom);

      if (this.#points.length > 1) {
        this.#collection = new ymaps.GeoObjectCollection(null, this.options.style);

        for (let i = 0, max = this.#points.length; i < max; i++) {
          this.#collection.add(new ymaps.Placemark(this.#points[i].coords));
        }
      } else {
        this.#collection = new ymaps.Placemark(this.#points[0].coords, null, this.options.style);
        this.#isSinglePickup = true;
      }

      this.#map.geoObjects.add(this.#collection);
      this.rerender();
    });
  }

  #setOptions(currentOpt, newOpt) {
    for (let option in newOpt) {
      if (!newOpt.hasOwnProperty(option)) continue;

      if (typeof newOpt[option] === 'object' && currentOpt[option] !== undefined) {
        this.#setOptions(currentOpt[option], newOpt[option]);
      } else {
        currentOpt[option] = newOpt[option];
      }
    }
  }

  #changeBehavior() {
    for (let behavior in this.options.behaviors) {
      if (!this.options.behaviors.hasOwnProperty(behavior)) continue;

      if (this.options.behaviors[behavior]) {
        this.#map.behaviors.enable(behavior);
      } else {
        this.#map.behaviors.disable(behavior);
      }
    }
  }

  static checkType(value) {
    let regex = /^\[object (\S+?)\]$/;
    let matches = Object.prototype.toString.call(value).match(regex) || [];

    return (matches[1] || 'undefined').toLowerCase();
  }

  setPoints() {

  }

  addPoints() {

  }

  update(options = {}) {
    ymaps.ready(() => {
      this.#setOptions(this.options, options);
      this.#changeBehavior.bind(this)();
      this.rerender();
    });
  }

  rerender() {
    this.#map.container.fitToViewport();

    if (!this.#isSinglePickup) {
      this.#centerAndZoom = ymaps.util.bounds.getCenterAndZoom(
          this.#collection.getBounds(),
          this.#map.container.getSize(),
          this.#map.options.get('projection'),
      );

      this.#map.setCenter(this.#centerAndZoom.center, this.#centerAndZoom.zoom - 1);
    } else {
      this.#map.setCenter(this.#points[0].coords, 17);
    }
  }
}