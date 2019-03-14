export default class Tabs {
  /**
   * Tabs
   * @constructor
   * @param {object} element - The HTML element
   * @param {object} options - An option map
   */
  constructor(element, options) {
    /** Default settings */
    let defaults = {
      activeTab: location.hash,
      tabsArr: [],
      linksArr: [],
    };

    for (let option in options) {
      if (!options.hasOwnProperty(option)) continue;

      if (defaults[option] === undefined) {
        console.log(`Oops! Tabs do not have property: ${option}`);
        return this;
      }

      defaults = options[option];
    }

    this.el = element;
    this.options = defaults;

    this.init();
  }

  init() {
    console.log('init el', this.el);
    console.log('init opt', this.options);

    this.el.onclick = e => {
      let target = e.target || window.event.srcElement;
      console.log(e);

      if (target.classList.contains('tabs__link')) {
        console.log(target.index);
        this.changeTab();
      }
    };

  }

  addClass() {

  }

  changeTab() {

  }
}