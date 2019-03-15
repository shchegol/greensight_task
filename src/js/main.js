import Tab from './tabs';

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
});

function initTabs() {
  let tabs = document.getElementById('tabs');
  new Tab(tabs);
}