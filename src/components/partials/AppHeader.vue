<template lang="html">
  <b-navbar class="fixed-top" toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <a class="navbar-brand brand-logo text-primary" href="/">BuildIt</a>
      <a class="navbar-brand brand-logo-mini text-primary" href="/">BuildIt</a>
    </div>
    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <img class="img-xs rounded-circle" src="../../assets/images/faces/face4.jpg" alt="profile image">
          </template>
          <b-dropdown-item href="#" v-on:click="signOut">Log out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="js">
export default {
  name: 'app-header',
  methods:{
    signOut(){
      localStorage.clear();
      this.$router.go('/auth')
    }
  }
}
</script>

<style scoped lang="scss">
.app-header {
}
</style>
