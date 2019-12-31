import Vue from 'vue'
import App from './App'
import Vue2TouchEvents from 'vue2-touch-events'
import router from './router/index';

Vue.config.productionTip = false;

Vue.use(Vue2TouchEvents, {
  swipeTolerance: 100,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');













