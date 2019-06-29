<template lang="html">
  <div id="app">
    <div class="container-scroller">
      <login v-if="!loggedIn" @loggedIn="setLoggedIn"></login>
      <dashboard v-if="loggedIn"></dashboard>
    </div>
  </div>
</template>

<script lang="js">
  import Login from '../src/components/login'
  import Dashboard from '../src/components/home'
  import {RepositoryFactory} from './repo/RepositoryFactory.js'

  export default {
    name: 'main',
    components: {
      Login,
      Dashboard
    },
    data() {
      return {
        loggedIn: false,
      }
    },
    mounted() {
      this.loggedIn = localStorage.getItem('loggedIn') === 'true';
    },
    created() {
      this.getSuppliers();
      this.getConstructionSites();
    },
    methods: {
      setLoggedIn(data) {
        console.log(data);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('authorization', data.token);
        localStorage.setItem('role',data.role)
        localStorage.setItem('name',data.name)
        localStorage.setItem('user', JSON.stringify(data));
        this.loggedIn = true;
        this.$router.go('/')
      },
      getSuppliers() {
        try {
          RepositoryFactory.get("supplier").getSuppliers();
        } catch (e) {
        }
      },
      getConstructionSites() {
        try {
          RepositoryFactory.get("cons").getConstructionSites();
        } catch (e) {

        }
      }
    }
  }
</script>

<style>
  @import "../node_modules/mdi/css/materialdesignicons.min.css";
  @import "../node_modules/flag-icon-css/css/flag-icon.min.css";
  @import "../node_modules/font-awesome/css/font-awesome.min.css";
</style>

<style lang="scss">
  @import "./assets/scss/style";
</style>
