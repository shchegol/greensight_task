import {debounce} from './utils';

export default class Tabs {
  /**
   * Tabs
   * @constructor
   * @param {object} elem - HTML elem
   * @param {object} options - An option map
   */
  constructor(elem, options = {}) {
    /** Default settings */
    let defaults = {
      startTab: 0,
      breakpoint: 768,
    };

    for (let option in options) {
      if (!options.hasOwnProperty(option)) continue;

      if (defaults[option] === undefined) {
        console.log(`Oops! Tabs do not have property: ${option}`);
        return this;
      }

      defaults = options[option];
    }

    this.elem = elem;
    this.options = defaults;
    this.btns = [...elem.getElementsByClassName('tabs__link')];
    this.phoneBtns = [...elem.getElementsByClassName('tabs__link-adaptive')];
    this.tabs = [...elem.getElementsByClassName('tabs__item')];
    this.activeTabIndex = this.options.startTab;
    this.isPhone = document.body.clientWidth < this.options.breakpoint;

    this.init();
  }

  init() {
    console.log('init');
    this.changeTab(this.activeTabIndex);

    this.elem.onclick = event => {
      let btnClass = 'tabs__link';
      let btnsArr = 'btns';

      if(this.isPhone) {
        btnClass = 'tabs__link-adaptive';
        btnsArr = 'phoneBtns';
      }

      if (event.target.classList.contains(btnClass)) {
        let index = this[btnsArr].indexOf(event.target);

        if (index !== this.activeTabIndex) {
          this.activeTabIndex = index;
          this.changeTab(index);
        }
      }
    };

    window.onresize = debounce(() => {
      this.isPhone = document.body.clientWidth < this.options.breakpoint;
      this.changeTab(this.activeTabIndex);
    }, 200);
  }

  changeTab(tabIndex) {
    console.log('changeTab', tabIndex);
    let btnClass = 'tabs__link';
    let btnsArr = 'btns';

    if(this.isPhone) {
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