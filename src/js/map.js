
// import {debounce} from './utils';
//
// export default class Tabs {
//   /**
//    * Tabs
//    * @constructor
//    * @param {object} elem - HTML elem
//    * @param {object} options - An option map
//    */
//   constructor(elem, options = {}) {
//     /** Default settings */
//     let defaults = {
//       startTab: 0,
//       breakpoint: 768,
//     };
//
//     for (let option in options) {
//       if (!options.hasOwnProperty(option)) continue;
//
//       if (defaults[option] === undefined) {
//         console.log(`Oops! Tabs do not have property: ${option}`);
//         return this;
//       }
//
//       defaults = options[option];
//     }
//
//     this.elem = elem;
//     this.options = defaults;
//     this.btns = [...elem.getElementsByClassName('tabs__link')];
//     this.phoneBtns = [...elem.getElementsByClassName('tabs__link-adaptive')];
//     this.tabs = [...elem.getElementsByClassName('tabs__item')];
//     this.activeTabIndex = this.options.startTab;
//     this.isPhone = document.body.clientWidth < this.options.breakpoint;
//
//     this.init();
//   }
//
//   init() {
//     console.log('map init');
//
//     this.elem.ready(init);
//     function init(){
//       // Создание карты.
//       var myMap = new ymaps.Map("map", {
//         // Координаты центра карты.
//         // Порядок по умолчанию: «широта, долгота».
//         // Чтобы не определять координаты центра карты вручную,
//         // воспользуйтесь инструментом Определение координат.
//         center: [55.76, 37.64],
//         // Уровень масштабирования. Допустимые значения:
//         // от 0 (весь мир) до 19.
//         zoom: 7
//       });
//     }
//
//     window.onresize = debounce(() => {
//       console.log('resize')
//     }, 200);
//   }
// }