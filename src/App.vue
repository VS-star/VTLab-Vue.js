<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link>
    <router-link v-else to="/login">Login</router-link>
  </div>
  <div class="jumbotron">
    <div class="container">
        <!-- <div class="row">
            <div class="col-sm-6 col-sm-offset-3"> -->
                <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                <router-view></router-view>
            <!-- </div>
        </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    alert () {
      return this.$store.state.alert
    },
    loggedIn () {
      return this.$store.state.authentication.status.loggedIn
    }
  },
  watch:{
    $route (to, from){
      // clear alert on location change
      this.$store.dispatch('alert/clear');
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
