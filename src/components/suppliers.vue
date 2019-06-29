<template>
  <div class="container">
    <div class="col-4" style="margin: 0 auto" v-if="!show">
      <vs-progress indeterminate color="primary">primary</vs-progress>
    </div>
    <div class="row" v-if="show">
      <div class="col-md-3" v-for="(sup) in suppliers">
        <div class="card">

          <div class="card-body"><h5 class="card-title">
            Supplier name
          </h5>
            {{sup.name}}
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
        suppliers: []
      }
    },
    created() {
      this.$toasted.show(`Please wait, getting list of suppliers ...`, {
        duration: 100,
        singleton: true
      });
      const vue = this;
      this.$axios.get('/api/suppliers').then(({data} = response) => {
        console.log(data);
        vue.suppliers = data;
        vue.show = true
      })
    }
  }
</script>
