<template>
  	<div>
    	<h2>Genres</h2>
		<p>
		    <router-link :to="{ name: 'Genre', params: { id: -1 } }">Create new</router-link>
		</p>
		<table class="table">
			<thead>
			    <tr>
			        <th>
			            Title
			        </th>
			        <th></th>
			    </tr>
		    </thead>
		    <tbody>
			    <tr v-for="genre in genres">
			        <td>
			            {{genre.Title}}
			        </td>
			        <td>
			            <a href="#" v-on:click="deleteGenre(genre.GenreId)">Delete</a>
			        </td>
			    </tr>
		    </tbody>
		</table>
  	</div>
</template>

<script>
export default {
  props: {
  	genresList: []
  },
  data() {
  	return {
  		genres: this.genresList
  	}
  },
  mounted() {
  	this.fetchGenres();
  },
  methods: {
  	fetchGenres() {
		this.$http.get(window.serverUrl +  "GetGenres/").then(response => {
	        this.genres = response.data.$values.reverse();
	    }, response => {
	        console.log("error:", response);
	    });
  	},

  	deleteGenre(genreId) {
  		this.$http.get(window.serverUrl +  "DeleteGenre/" + genreId).then(response => {
	  		this.fetchGenres();
	    }, response => {
	        console.log("error:", response);
	    });
  	}
  }
}
</script>
