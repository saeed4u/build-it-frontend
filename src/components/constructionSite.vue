<template>
  <div class="container">
    <div class="col-4" style="margin: 0 auto" v-if="!show">
      <vs-progress indeterminate color="primary">primary</vs-progress>
    </div>
    <div class="row" v-if="show">
      <div class="col-md-3" v-for="(site) in sites">
        <div class="card">

          <div class="card-body"><h5 class="card-title">
            Site address
          </h5>
            {{site.address}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'construction-site',
    data() {
      return {
        show: false,
        sites: []
      }
    },
    created() {
      this.$toasted.show(`Please wait, getting list of construction sites ...`, {
        duration: 100,
        singleton: true
      });
      const vue = this;
      this.$axios.get('/api/construction-site').then(({data} = response) => {
        console.log(data);
        vue.sites = data;
        vue.show = true
      })

    }
  }
</script>
