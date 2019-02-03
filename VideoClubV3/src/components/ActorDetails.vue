<template>
  <div v-if="actor">
    <h2>Actor Details</h2>

	<div>
	    <h4>Actor</h4>
	    <hr/>
	    <dl class="dl-horizontal">
	        <dt>
	            Full Name
	        </dt>

	        <dd>
	            {{actor.FullName}}
	        </dd>

	        <dt>
	            Birth Date
	        </dt>

	        <dd>
	            {{this.$parent.parseDate(actor.BirthDate)}}
	        </dd>

	        <dt>
	            Biography
	        </dt>

	        <dd>
	            {{actor.Biography}}
	        </dd>

	        <dt>
	            Country
	        </dt>

	        <dd>
	            {{actor.Country.Name}}
	        </dd>

	    </dl>
	</div>
	<p>
	    <router-link :to="{ name: 'Actor', params: { id: actor.ActorId } }">Edit</router-link> |
	    <router-link :to="{ name: 'Actors' }">Back to actors list</router-link>
	</p>

  </div>
</template>

<script>
export default {
  	props: {
        actorObj: {},
    },
    data() {
        return { 
        	actor: this.actorObj
        }
    },
    mounted() {
        this.fetchActor();
    },
    methods: {
    	fetchActor() {
    		this.$http.get(window.serverUrl + "GetActor/"+ this.$route.params.id)
    		.then(response => {
                this.actor = response.data;
            }, response => {
                console.log("error:", response);
            });
    	}
    }
}
</script>
