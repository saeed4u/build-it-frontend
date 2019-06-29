<template>
  <section class="dashboard">
    <app-header/>
    <div class="container-fluid page-body-wrapper">
      <app-sidebar/>
      <div class="main-panel">
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
        <!-- content wrapper ends -->
        <app-footer/>
      </div>
      <!-- main panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </section>
</template>

<script>
  import AppHeader from './partials/AppHeader'
  import AppSidebar from './partials/AppSidebar'
  import AppFooter from './partials/AppFooter'
  export default{
    name: 'dashboard',
    components: {
      AppHeader,
      AppSidebar,
      AppFooter
    }
  }
</script>
