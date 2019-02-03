<template>
  	<div>
    	<h2>Countries</h2>

		<p>
		    <router-link :to="{ name: 'Country' }">Create new</router-link>
		</p>
		<table class="table">
			<thead>
			    <tr>
			        <th>
			            Name
			        </th>
			        <th></th>
			    </tr>
		    </thead>
		    <tbody>
			    <tr v-for="country in countries">
			        <td>
			            {{country.Name}}
			        </td>
			        <td>
			            <a href="#" v-on:click="deleteCountry(country.CountryId)">Delete</a>
			        </td>
			    </tr>
		    </tbody>
		</table>
  	</div>
</template>

<script>
export default {
  props: {
  	countriesList: []
  },
  data() {
  	return {
  		countries: this.countriesList
  	}
  },
  mounted() {
  	this.fetchCountries();
  },
  methods: {
  	fetchCountries() {
  		this.$http.get(window.serverUrl +  "GetCountries/")
  		.then(response => {
	        this.countries = response.data.$values.reverse();
	    }, response => {
	        console.log("error:", response);
	    });
  	},

  	deleteCountry(countryId) {
  		this.$http.get(window.serverUrl +  "DeleteCountry/" + countryId)
  		.then(response => {
	  		this.fetchCountries();
	    }, response => {
	        console.log("error:", response);
	    });
  	}
  }
}
</script>
