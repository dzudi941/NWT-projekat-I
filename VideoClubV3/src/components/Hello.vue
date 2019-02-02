<template>
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
                    {{ movie.Genres }}
                </td>
                <td>
                    <router-link :to="{name: 'CreateMovie', params: {id: movie.MovieId}}">Edit</router-link> | 
                    <router-link :to="{name: 'CreateMovie', params: {id: movie.MovieId}}">Details</router-link> | 
                    <router-link :to="{name: 'CreateMovie', params: {id: movie.MovieId}}">Delete</router-link>
                </td>
            </tr>
		</tbody>
	</table>
</template>

<script>

  export default {
    /*components: {
      MainLayout
    },*/
    props: {
        moviesList: []
    },
    data: function() {
        return { movies : this.moviesList}
    },
    mounted() {
        this.$http.get(window.serverUrl).then(response => {
            this.movies = response.data.$values.reverse();
        }, response => {
            console.log("error:", response);
        });
    }
  }
</script>