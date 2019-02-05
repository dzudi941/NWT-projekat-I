<template>
<div>
    <h2>Movies</h2>
    <p>
        <router-link to="/movie/-1">Create new</router-link>
    </p>
	<table class="table">
		<thead>
			<tr>
				<th>Title</th>
				<th>Director</th>
				<th>Year</th>
				<th>Count</th>
				<th>Genres</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="movie in movies">
                <td>
                    {{ movie.Title }}
                </td>
                <td>
                    {{ movie.Director }}
                </td>
                <td>
                    {{ new Date(movie.Year).toLocaleDateString() }}
                </td>
                <td>
                    {{ movie.Count }}
                </td>
                <td>
                    <span v-for="genre in movie.Genres.$values">{{genre.Title}}, </span>
                </td>
                <td>
                    <router-link :to="{name: 'Movie', params: {id: movie.MovieId}}">Edit</router-link> | 
                    <router-link :to="{name: 'MovieDetails', params: {id: movie.MovieId}}">Details</router-link> | 
                    <a href="#" v-on:click="deleteMovie(movie.MovieId)">Delete</a>
                </td>
            </tr>
		</tbody>
	</table>
</div>
</template>

<script>

  export default {
    props: {
        moviesList: []
    },
    data() {
        return { movies : this.moviesList}
    },
    mounted() {
        this.fetchMovies();
    },
    methods: {
        deleteMovie(movieId) {
            this.$http.get(window.serverUrl + "DeleteMovie/" + movieId)
            .then(response => {
                this.fetchMovies();
            }, response => {
                console.log("error:", response);
            });
        },
        fetchMovies() {
            this.$http.get(window.serverUrl)
            .then(response => {
                this.movies = response.data.$values.reverse();
            }, response => {
                console.log("error:", response);
            });
        }
    }
  }
</script>