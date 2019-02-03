<template>
  <div id="app">
  	<div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link class="navbar-brand" :to="{ name: 'Home' }">VideoClub</router-link>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
                    <li><router-link :to="{ name: 'Actors' }">Actors</router-link></li>
                    <li><router-link :to="{ name: 'Genres' }">Genres</router-link></li>
                    <li><router-link :to="{ name: 'Countries' }">Countries</router-link></li>
                </ul>
            </div>
        </div>
    </div>
    <div style="margin-top: 50px;" class="container body-content">
    	<router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    parseDate(dateString) {
        return dateString.split('T')[0];
    }
  }
}
</script>
