import Vue from 'vue';
import App from './App';
import gitCard from './Card';
import Vue2Storage from 'vue2-storage';

/* eslint-disable no-new */

Vue.use(Vue2Storage);
Vue.component('git-card', gitCard);

new Vue({
  el: '#app',

  render: h => h(App),
});
