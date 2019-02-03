<template>
  <div>
    <h2>Create Country</h2>
    <div class="form-horizontal">
        <h4>Genre</h4>
        <hr />
        <div class="form-group">
        	<label class = "control-label col-md-2">Name</label>
            <div class="col-md-10">
            	<input v-model="Name" type="text" name="Name" class = "form-control">
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
            	<button class="btn btn-default" v-on:click="createCountry">Create</button>
            </div>
        </div>
    </div>
	<div>
	   	<router-link :to="{ name: 'Countries' }">Back to coutries list</router-link>
	</div>
  </div>
</template>
<script>
export default {
  data() {
  	return {
  		Name: ""
  	}
  },
  methods: {
  	createCountry() {
  		let country = {
  			Name: this.Name
  		}
  		this.$http.post(window.serverUrl +  "CreateCountry/", country)
      .then(response => {
	  		this.$router.push("/countries");
	    }, response => {
	        console.log("error:", response);
	    });
  	}
  }
}
</script>
