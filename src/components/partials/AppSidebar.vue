<template lang="html">

  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <div class="nav-link">
            <div class="profile-image"> <img src="../../assets/images/faces/face4.jpg" alt="image"/> <span class="online-status online"></span> </div>
            <div class="profile-name">
              <p class="name"></p>
              <p class="designation"></p>
            </div>
          </div>
        </li>
        <li class="nav-item"><router-link class="nav-link" to="/"><img class="menu-icon" src="../../assets/images/menu_icons/01.png" alt="menu icon"><span class="menu-title">Dashboard</span></router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/plants"><img class="menu-icon" src="../../assets/images/menu_icons/01.png" alt="menu icon"><span class="menu-title">Plants</span></router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/invoices/"><img class="menu-icon" src="../../assets/images/menu_icons/02.png" alt="menu icon"><span class="menu-title">Invoices</span></router-link></li>
      </ul>
    </nav>
  </section>

</template>

<script lang="js">
export default {
  name: 'app-sidebar'
}
</script>

<style scoped lang="scss">
.app-sidebar {

}
</style>
