<template>
  <div>
    <h2>Create Genre</h2>
    <div class="form-horizontal">
        <h4>Genre</h4>
        <hr />
        <div class="form-group">
        	<label class = "control-label col-md-2">Title</label>
            <div class="col-md-10">
            	<input v-model="Title" type="text" name="Title" class = "form-control">
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
            	<button class="btn btn-default" v-on:click="createGenre">Create</button>
            </div>
        </div>
    </div>
	<div>
	   	<router-link :to="{ name: 'Genres' }">Back to genres list</router-link>
	</div>
  </div>
</template>
<script>
export default {
  data() {
  	return {
  		Title: ""
  	}
  },
  methods: {
  	createGenre() {
  		let genre = {
  			Title: this.Title
  		}
  		this.$http.post(window.serverUrl +  "CreateGenre/", genre)
      .then(response => {
	  		this.$router.push("/genres");
	    }, response => {
	        console.log("error:", response);
	    });
  	}
  }
}
</script>
