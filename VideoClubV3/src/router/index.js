import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Movie from '@/components/Movie.vue';
import MovieDetails from '@/components/MovieDetails.vue';
import Actors from '@/components/Actors.vue';
import Actor from '@/components/Actor.vue';
import ActorDetails from '@/components/ActorDetails.vue';
import Genres from '@/components/Genres.vue';
import Genre from '@/components/Genre.vue';
import Countries from '@/components/Countries.vue';
import Country from '@/components/Country.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movieDetails/:id',
      name: 'MovieDetails',
      component: MovieDetails
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/actors',
      name: 'Actors',
      component: Actors
    },
    {
      path: '/actor/:id',
      name: 'Actor',
      component: Actor
    },
    {
      path: '/actorDetails/:id',
      name: 'ActorDetails',
      component: ActorDetails
    },
    {
      path: '/genres',
      name: 'Genres',
      component: Genres
    },
    {
      path: '/genre',
      name: 'Genre',
      component: Genre
    },
    {
      path: '/countries',
      name: 'Countries',
      component: Countries
    },
    {
      path: '/country',
      name: 'Country',
      component: Country
    }
  ]
});
