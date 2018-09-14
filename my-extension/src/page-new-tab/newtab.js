import Vue from 'vue';
import App from './App';
import gitCard from './Card';
import Vue2Storage from 'vue2-storage';
import VueLoading from 'vue-simple-loading';
import VueSingleSelect from 'vue-single-select';

/* eslint-disable no-new */

Vue.use(Vue2Storage);
Vue.use(VueLoading);

Vue.component('vue-single-select', VueSingleSelect);
Vue.component('git-card', gitCard);

new Vue({
  el: '#app',

  render: h => h(App),
});
