<template>
<div>
	<h2>Actors</h2>
	<p>
		<router-link :to="{ name: 'Actor', params: { id: -1 } }">Create new</router-link>
	</p>
	<table class="table">
		<thead>
		    <tr>
		        <th>
		            Full Name
		        </th>
		        <th>
		            Birth Date
		        </th>
		        <th>
		            Biography
		        </th>
		        <th>
		           Country
		        </th>
		        <th></th>
		    </tr>
		</thead>
		<tbody>
		    <tr v-for="actor in actors">
		        <td>
		            {{actor.FullName}}
		        </td>
		        <td>
		             {{new Date(actor.BirthDate).toLocaleDateString()}}
		        </td>
		        <td>
		            {{actor.Biography}}
		        </td>
		        <td>
		            {{actor.Country.Name}}
		        </td>
		        <td>
		        	<router-link :to="{ name: 'Actor', params: { id: actor.ActorId } }">Edit</router-link> | 
		        	<router-link :to="{ name: 'ActorDetails', params: { id: actor.ActorId } }">Detais</router-link> |
		        	<a href="#" v-on:click="deleteActor(actor.ActorId)">Delete</a>
		        </td>
		    </tr>
	    </tbody>
	</table>
</div>
</template>

<script>
export default {
  props: {
  	actorsList: []
  },
  data() {
  	return {
  		actors: this.actorsList
  	}
  },
  mounted() {
  	this.fetchActors();
  },
  methods: {
  	fetchActors() {
		this.$http.get(window.serverUrl +  "GetActors/")
		.then(response => {
	        this.actors = response.data.$values.reverse();
	    }, response => {
	        console.log("error:", response);
	    });
  	},

  	deleteActor(actorId) {
		this.$http.get(window.serverUrl + "DeleteActor/" + actorId)
		.then(response =>{
            this.fetchActors();
        }, response => {
            console.log("error:", response);
        });
  	}
  }
}
</script>
