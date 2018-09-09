import Vue from 'vue';
import App from './App';
import gitCard from './Card';
/* eslint-disable no-new */

Vue.component('git-card', gitCard);

new Vue({
  el: '#app',

  render: h => h(App),
});
