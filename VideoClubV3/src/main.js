import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';

window.serverUrl = 'http://localhost:54705/api/VideoClubWebApi/';

Vue.config.productionTip = false
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
