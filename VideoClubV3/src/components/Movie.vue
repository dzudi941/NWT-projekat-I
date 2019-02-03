<template>
	<div class="form-horizontal col-md-8">
        <h4>Movie</h4>
        <hr>

        <div class="form-group">
            <label class="control-label col-md-2">Year</label>
            <div class="col-md-10">
                <input v-model="Year" class="form-control" type="date">
            </div>
        </div>
    
        <div class="form-group">
            <label class="control-label col-md-2">Title</label>
            <div class="col-md-10">
                <input v-model="Title" class="form-control" type="text">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-2">Director</label>
            <div class="col-md-10">
                <input v-model="Director" class="form-control" type="text">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-2">Description</label>
            <div class="col-md-10">
                <textarea v-model="Description" class="form-control" cols="20" rows="2"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-2" for="Movie_Country">Country</label>
            <div class="col-md-10">
                <select v-model="selectedCountry" class="form-control" data-val="true"id="CountryId" name="CountryId">
                    <option v-for="country in countries" v-bind:value="country.CountryId">{{country.Name}}</option>
                </select>
            </div>
        </div>
    
        <div class="form-group">
            <label class="control-label col-md-2">Count</label>
            <div class="col-md-10">
                <input v-model="Count" class="form-control" type="number">
            </div>
        </div>
    
        <div class="form-group">
            <label class="control-label col-md-2" for="Genre">Genre</label>
            <div class="col-md-10">
    
            <select v-model="selectedGenres" class="form-control" id="GenreIds" multiple="multiple" name="GenreIds">
            	<option v-for="genre in genres" v-bind:value="genre.GenreId">{{genre.Title}}</option>
            </select>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-2" for="Actors">Actors</label>
            <div class="col-md-10">
                <select v-model="selectedActors" class="form-control" id="ActorIds" multiple="multiple" name="ActorIds">
                	<option v-for="actor in actors" v-bind:value="actor.ActorId">{{actor.FullName}}</option>
                </select>
            </div>
        </div>
    
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <button v-if="this.$route.params.id == -1" class="btn btn-default" v-on:click="createMovie">Create</button>
                <button v-else class="btn btn-default" v-on:click="editMovie">Edit</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
        countriesList: [],
        genresList: [],
        actorsList: [],
    },
    data() {
        return { 
        	countries: this.countriesList,
        	genres: this.genresList,
        	actors: this.actorsList,

        	Year: '',
        	Title: '',
        	Director: '',
        	Description: '',
        	selectedCountry: 0,
        	Count: 0,
        	selectedGenres: [],
        	selectedActors: [],

            movieId: this.$route.params.id
        }
    },
    mounted() {
        if(this.$route.params.id == -1)
            this.fetchMovieData();
        else
        {
            this.fetchMovieData();
            this.fetchMovie(this.$route.params.id);
        }
    },
    methods: {
        getMovieObject() {
            let movie = {
                Year: this.Year,
                Title: this.Title,
                Director: this.Director,
                Description: this.Description,
                SelectedCountry: this.selectedCountry,
                Count: this.Count,
                SelectedGenres: this.selectedGenres,
                SelectedActors: this.selectedActors
            }
            return movie;
        },

        fetchMovieData() {
            this.$http.get(window.serverUrl +  "GetMovieData/")
            .then(response => {
                this.countries = response.data.Countries.$values;
                this.genres = response.data.Genres.$values;
                this.actors = response.data.Actors.$values;
            }, response => {
                console.log("error:", response);
            });
        },

        fetchMovie(movieId) {
            this.$http.get(window.serverUrl +  "GetMovie/" + movieId)
            .then(response => {
                this.Year = this.$parent.parseDate(response.data.Year);
                this.Title = response.data.Title;
                this.Director = response.data.Director;
                this.Description = response.data.Description;
                this.selectedCountry = response.data.SelectedCountry;
                this.Count = response.data.Count;
                this.selectedGenres = response.data.SelectedGenres.$values;
                this.selectedActors = response.data.SelectedActors.$values;
            }, response => {
                console.log("error:", response);
            });
        },

    	createMovie() {
    		this.$http.post(window.serverUrl + "CreateMovie/", this.getMovieObject())
            .then(response => {
	            console.log(response)
	            this.$router.push("/");
	        }, response => {
	            console.log("error:", response);
	        });
    	},

        editMovie() {
            let movie = this.getMovieObject();
            movie.MovieId = this.$route.params.id;
            this.$http.post(window.serverUrl + "EditMovie/", movie)
            .then(response => {
                this.$router.push("/");
            }, response => {
                console.log("error:", response);
            });
        }
    }
  }
</script>
