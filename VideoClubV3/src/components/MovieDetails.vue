<template>
  <div v-if="movie"> 
	<h2>Movie Details</h2>
	<div>
	    <h4>Movie</h4>
	    <hr />
	    <dl class="dl-horizontal">
	        <dt>
	            Year
	        </dt>

	        <dd>
	            {{this.$parent.parseDate(movie.Year)}}
	        </dd>

	        <dt>
	            Title
	        </dt>

	        <dd>
	            {{movie.Title}}
	        </dd>

	        <dt>
	            Director
	        </dt>

	        <dd>
	            {{movie.Director}}
	        </dd>

	        <dt>
	            Description
	        </dt>

	        <dd>
	           {{movie.Description}}
	        </dd>

	        <dt>
	            Country
	        </dt>

	        <dd>
	            {{movie.Country.Name}}
	        </dd>

	        <dt>
	            Count
	        </dt>

	        <dd>
	            {{movie.Count}}
	        </dd>


	        <dt>
	            Actors
	        </dt>

	        <dd>
	        	<span v-for="actor in movie.Actors.$values">{{actor.FullName}}, </span>
	        </dd>
	        <dt>
	            Genres
	        </dt>

	        <dd>
	        	<span v-for="genre in movie.Genres.$values">{{genre.Title}}, </span>
	        </dd>

	    </dl>
	</div>
	<p>
	    <router-link :to="{name: 'Movie', params: {id: movie.MovieId}}">Edit</router-link> |
	    <router-link :to="{ name: 'Home' }">Back to list</router-link>
	</p>
  </div>
</template>

<script>
export default {
	props: {
        movieObj: {}
    },
    data() {
        return { movie: this.movieObj }
    },
    mounted() {
        this.fetchMovie();
    },
    methods: {
    	fetchMovie() {
    		this.$http.get(window.serverUrl + "GetMovie/"+ this.$route.params.id)
    		.then(response => {
                this.movie = response.data;
            }, response => {
                console.log("error:", response);
            });
    	}
    }
}
</script>
