<template>
    	<div class="form-horizontal col-md-8">
            <h4>Movie</h4>
            <hr>

            <div class="form-group">
                <label class="control-label col-md-2" for="Movie_Year">Year</label>
                <div class="col-md-10">
                    <input v-model="Year" class="form-control" data-val="true" data-val-date="The field Year must be a date." data-val-required="The Year field is required." id="Movie_Year" name="Movie.Year" type="date" value="">
                </div>
                <span class="field-validation-valid text-danger" data-valmsg-for="Movie.Year" data-valmsg-replace="true"></span>
            </div>
        
            <div class="form-group">
                <label class="control-label col-md-2" for="Movie_Title">Title</label>
                <div class="col-md-10">
                    <input v-model="Title" class="form-control text-box single-line" id="Movie_Title" name="Movie.Title" type="text" value="">
                    <span class="field-validation-valid text-danger" data-valmsg-for="Movie.Title" data-valmsg-replace="true"></span>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2" for="Movie_Director">Director</label>
                <div class="col-md-10">
                    <input v-model="Director" class="form-control text-box single-line" id="Movie_Director" name="Movie.Director" type="text" value="">
                    <span class="field-validation-valid text-danger" data-valmsg-for="Movie.Director" data-valmsg-replace="true"></span>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2" for="Movie_Description">Description</label>
                <div class="col-md-10">
                    <textarea v-model="Description" class="form-control" cols="20" id="Movie_Description" name="Movie.Description" rows="2"></textarea>
                    <span class="field-validation-valid text-danger" data-valmsg-for="Movie.Description" data-valmsg-replace="true"></span>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2" for="Movie_Country">Country</label>
                <div class="col-md-10">
                    <select v-model="selectedCountry" class="form-control" data-val="true"id="CountryId" name="CountryId">
                    <option v-for="country in countries" v-bind:value="country.CountryId">{{country.Name}}</option>
                    </select>
                    <span class="field-validation-valid text-danger" data-valmsg-for="Movie.Country" data-valmsg-replace="true"></span>
                </div>
            </div>
        
            <div class="form-group">
                <label class="control-label col-md-2" for="Movie_Count">Count</label>
                <div class="col-md-10">
                    <input v-model="Count" class="form-control text-box single-line" data-val="true" data-val-number="The field Count must be a number." data-val-required="The Count field is required." id="Movie_Count" name="Movie.Count" type="number" value="">
                    <span class="field-validation-valid text-danger" data-valmsg-for="Movie.Count" data-valmsg-replace="true"></span>
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
    /*components: {
      MainLayout
    },*/
    props: {
        countriesList: [],
        genresList: [],
        actorsList: [],
       	movieDataUrl: window.serverUrl +  "GetMovieData/"
    },
    data: function() {
        return { 
        	countries: this.countriesList,
        	genres: this.genresList,
        	actors: this.actorsList,

        	Year: new Date(),
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
    	//console.log(this.$route.params.id)
        if(this.$route.params.id == -1)
            this.getMovieData();
        else
        {
            this.getMovieData();
            this.getMovie( this.$route.params.id);
        }
    },
    methods: {
        getMovieData() {
            this.$http.get(window.serverUrl +  "GetMovieData/").then(response => {
                this.countries = response.data.Countries.$values;
                this.genres = response.data.Genres.$values;
                this.actors = response.data.Actors.$values;
            }, response => {
                console.log("error:", response);
            });
        },

        getMovie(movieId) {
            this.$http.get(window.serverUrl +  "GetMovieById/" + movieId).then(response => {
                this.Year = new Date(response.data.Year);
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
    		console.log(movie)
    		this.$http.post(window.serverUrl + "CreateMovie/", movie).then(response => {
	            console.log(response)
	            window.location="/"
	        }, response => {
	            console.log("error:", response);
	        });
    	},
        editMovie() {
            
        }
    }
  }
</script>
