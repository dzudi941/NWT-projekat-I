<template>
  <div>
    <h2>Create Actor</h2>
	<div class="form-horizontal">
	    <h4>Actor</h4>
	    <hr/>
	    <div class="form-group">
	        <label class = "control-label col-md-2">Full Name</label>
	        <div class="col-md-10">
	        	<input v-model="FullName" type="text" name="FullName" class = "form-control">
	        </div>
	    </div>
	    <div class="form-group">
	        <label class="control-label col-md-2">Birth Date</label>
	        <div class="col-md-10">
	        	<input v-model="BirthDate" type="date" name="BirthDate" class = "form-control">
	        </div>
	    </div>
	    <div class="form-group">
	    	<label class = "control-label col-md-2">Biography</label>
	        <div class="col-md-10">
	        	<textarea v-model="Biography" name="Biography" class = "form-control"></textarea>
	        </div>
	    </div>
	    <div class="form-group">
	    	<label class = "control-label col-md-2">Country</label>
	        <div class="col-md-10">
	            <select v-model="SelectedCountry" class="form-control" name="selectedCountry">
                <option v-for="country in Countries" v-bind:value="country.CountryId">{{country.Name}}</option>
                </select>
	        </div>
	    </div>

	    <div class="form-group">
	        <div class="col-md-offset-2 col-md-10">
	            <button v-if="this.$route.params.id == -1" class="btn btn-default" v-on:click="createActor">Create</button>
	            <button v-else class="btn btn-default" v-on:click="editActor">Edit</button>
	        </div>
	    </div>
	</div>
	<div>
	    <router-link :to="{ name: 'Actors' }">Back to actors list</router-link>
	</div>
  </div>
</template>

<script>
export default {
  	props: {
        CountriesList: [],
    },
    data() {
        return { 
        	Countries: this.CountriesList,
        	FullName: '',
        	BirthDate: '',
        	Biography: '',
        	SelectedCountry: 0,
        }
    },
    mounted() {
        if(this.$route.params.id == -1)
            this.fetchCountries();
        else
        {
        	this.fetchCountries();
            this.fetchActor( this.$route.params.id);
        }
    },
    methods: {
        getActorObject() {
            let actor = {
                FullName: this.FullName,
                BirthDate: this.BirthDate,
                Biography: this.Biography,
                SelectedCountry: this.SelectedCountry
            }
            return actor;
        },

        fetchActor(actorId) {
            this.$http.get(window.serverUrl +  "GetActor/" + actorId)
            .then(response => {
                this.FullName = response.data.FullName;
                this.BirthDate = this.$parent.parseDate(response.data.BirthDate);
                this.Biography = response.data.Biography;
                this.SelectedCountry = response.data.SelectedCountry;
            }, response => {
                console.log("error:", response);
            });
        },

    	createActor() {
    		this.$http.post(window.serverUrl + "CreateActor/", this.getActorObject())
            .then(response => {
	            this.$router.push("/actors");
	        }, response => {
	            console.log("error:", response);
	        });
    	},
        editActor() {
            let actor = this.getActorObject();
            actor.ActorId = this.$route.params.id;
            this.$http.post(window.serverUrl + "EditActor/", actor)
            .then(response => {
                this.$router.push("/actors");
            }, response => {
                console.log("error:", response);
            });
        },

        fetchCountries() {
            this.$http.get(window.serverUrl +  "GetCountries/")
            .then(response => {
                this.Countries = response.data.$values;
                if(this.Countries.length > 0)
                {
	                this.SelectedCountry = this.Countries[0].CountryId;
	            }
            }, response => {
                console.log("error:", response);
            });
        }
    }
}
</script>
