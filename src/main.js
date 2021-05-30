import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
