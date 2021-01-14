// import Vue from 'vue';
// import { InfiniteScroll } from 'mint-ui';
import App from '../newbornzone.vue';
import router from '../router/router';
import '@/css/main.scss';

Vue.config.productionTip = false;
// Vue.component(InfiniteScroll);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
