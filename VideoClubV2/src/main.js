import Vue from 'vue';
//import routes from './routes';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Main from './layouts/Main';

window.serverUrl = 'http://localhost:54705/api/VideoClubWebApi/';

Vue.use(VueResource);
Vue.use(VueRouter);
const routes = [
  { path: '/', component: require('./pages/Home.vue') },
  { path: '/createMovie', component: require('./pages/CreateMovie.vue') }
]
const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

const app = new Vue({
  el: '#app',
  router,
  data: {
    currentRoute: window.location.pathname
  },
  template: '<Main/>',
  components: { Main }
  /*computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },*/
  /*render (h) {
    console.log(window.location)
    return h(this.ViewComponent)
  }*/
});



window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
