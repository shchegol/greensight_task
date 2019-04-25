export default class Tab {
  /**
   * Tab
   * @constructor
   * @param {object} elem - HTML elem
   * @param {object} options - An option map
   */
  constructor(elem, options = {}) {
    /** Default settings */
    let defaults = {
      isPhone: document.body.clientWidth < 768,
      startTab: 0,
    };

    for (let option in options) {
      if (!options.hasOwnProperty(option)) continue;

      if (defaults[option] === undefined) {
        console.log(`Oops! Tab do not have property: ${option}`);
        return this;
      }

      defaults[option] = options[option];
    }

    this.elem = elem;
    this.options = defaults;
    this.btns = [...elem.getElementsByClassName('tabs__link')];
    this.phoneBtns = [...elem.getElementsByClassName('tabs__link-adaptive')];
    this.tabs = [...elem.getElementsByClassName('tabs__item')];
    this.activeTabIndex = this.options.startTab;

    this.init();

    return elem;
  }

  init() {
    console.log('init');
    this.change(this.activeTabIndex);

    this.elem.onclick = event => {
      let btnClass = 'tabs__link';
      let btnsArr = 'btns';

      if (this.options.isPhone) {
        btnClass = 'tabs__link-adaptive';
        btnsArr = 'phoneBtns';
      }

      if (event.target.classList.contains(btnClass)) {
        let index = this[btnsArr].indexOf(event.target);

        if (index !== this.activeTabIndex) {
          this.activeTabIndex = index;
          this.change(index);
        }
      }
    };
  }

  update(options) {
    console.log('update tab', options);
    if (options !== undefined) {
      for (let option in options) {

        if (!options.hasOwnProperty(option)) continue;

        if (this.options[option] === undefined) {
          console.log(`Oops! Tabs do not have property: ${option}`);
          return this;
        }

        this.options[option] = options[option];
      }
    }

    this.change(this.activeTabIndex);
  }

  change(tabIndex) {
    console.log('change tab', tabIndex);

    let btnClass = 'tabs__link';
    let btnsArr = 'btns';
    let widgetEvent = new CustomEvent('changeTab', {
      bubbles: true,
      detail: {
        activeTab: tabIndex,
      },
    });

    if (this.options.isPhone) {
      btnClass = 'tabs__link-adaptive';
      btnsArr = 'phoneBtns';
    }

    for (let i = 0, max = this[btnsArr].length; i < max; i++) {
      let btn = this[btnsArr][i];
      let tab = this.tabs[i];

      if (tabIndex === i) {
        addClass(btn, `${btnClass}_active`);
        addClass(tab, 'tabs__item_active');
      } else {
        removeClass(btn, `${btnClass}_active`);
        removeClass(tab, 'tabs__item_active');
      }
    }

    this.elem.dispatchEvent(widgetEvent);
  }
}

function addClass(elem, className) {
  let classList = elem.classList;
  if (!classList.contains(className)) {
    classList.add(className);
  }
}

function removeClass(elem, className) {
  let classList = elem.classList;
  if (classList.contains(className)) {
    classList.remove(className);
  }
}