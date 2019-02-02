<template>
  <main-layout>
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
                    <a href="#" onclick="">Edit</a> | 
                    <a href='#' onclick="">Details</a> | 
                    <a href='#' onclick="">Delete</a>
                </td>
            </tr>
		</tbody>
	</table>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
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
