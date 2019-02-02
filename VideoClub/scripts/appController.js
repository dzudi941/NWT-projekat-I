var serverUrl = 'http://localhost:54705/api/VideoClubWebApi/';


const Foo = { template: '<div>foo</div>' }
const Home = Vue.component('home', {
                template: 'Home',
                props: {
                    moviesList: []
                },
                data: function() {
                    return { movies : this.moviesList}
                },
                mounted() {
                    console.log(this)
                    this.$http.get(serverUrl).then(response => {

                        this.movies = response.data.$values;

                    }, response => {
                        console.log("error:", response);
                    });
                }
            });
const routes = [

  { path: '/createNewMovie', component: Foo },
  {path: '/', component: Home }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

var app = new Vue({
    el: '#app',
    router,
    data: {
        movies: []
    },
    methods: {
        queryWeather(resource) {
            this.$http.get(serverUrl + this.query).then(response => {
                
            }, response =>{
                console.log("error:", response);
            });
        },
    },
    mounted: function() {
        this.$http.get(serverUrl).then(response => {
            this.movies = response.data.$values;
        }, response => {
            console.log("error:", response);
        });
    }
});