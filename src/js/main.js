import Tab from './tabs';

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
});

function initTabs() {
  let tabs = document.getElementsByClassName('tabs');
  let i = tabs.length;

  while (i--) {
    new Tab(tabs[i]);
  }
}



