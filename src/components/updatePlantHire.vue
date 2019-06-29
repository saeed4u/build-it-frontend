<template>
 <div class="row flex align-content-center">
    <div class="col-md-12">
      <div class="col-4  grid-margin stretch-card" style="margin: 0 auto" v-if="isLoading">
        <div class="card">
          <div class="card-body">
            <vs-progress indeterminate color="primary">primary</vs-progress>
          </div>
        </div>
      </div>
      <div class="col-md-7 grid-margin stretch-card" v-if="!isLoading && hire">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Update plant hire request</h4>
             <form @submit.stop.prevent="createPlantHire">
            <b-form-group label="Start date">
              <b-form-input type="date" v-model="hire.rentalPeriod.startDate" placeholder="Start date" size="lg"></b-form-input>
            </b-form-group>

            <b-form-group label="End date">
              <b-form-input type="date" v-model="hire.rentalPeriod.endDate" placeholder="End date" size="lg"></b-form-input>
            </b-form-group>

            <b-form-group label="Delivery address">
                <b-form-select  required v-model="site" :options="sites" style="margin-top: 10px"></b-form-select>
            </b-form-group>
           <b-button type="submit" variant="success" v-on:click="updatePlant" class="mr-2">Update Hire Request</b-button>
                <span><router-link to="/" variant="light"
                               class="btn btn-outline-secondary btn-sm">Cancel</router-link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {RepositoryFactory} from '../repo/RepositoryFactory.js'
export default{
  name: 'update-hire',
  props: ['hire'],
  data(){
    return  {
      isLoading: false,
      sites: [],
      site: null
    }
  },
  mounted(){
    console.log(this.hire)
    this.isLoading = true;
    RepositoryFactory.get('cons').getConstructionSites().then((data)=>{
        this.sites = data;
        console.log(this.sites)
        const [{_,value}] = this.sites.filter((site)=> site.value === this.hire.site._id);
        this.site = value;
        this.isLoading = false;
    })
  },
  methods:{
    async updatePlant(){
      this.isLoading = true;
      const updateRequest = {
        constructionSiteId: this.site,
        rentalPeriod:{
          startDate: this.hire.rentalPeriod.startDate,
          endDate: this.hire.rentalPeriod.endDate
        }
      }
      try {
        const {data} = await RepositoryFactory.get('inv').updatePlantHire(this.hire._id, updateRequest)
          this.notify.success('Great!!, Plant hire request has been updated', 'Plant Hire', 5000)
        this.$router.push({name: 'dashboard'})
      } catch (error) {
          console.log(error)
          this.notify.error('Oops!!, An error occurred while updating the Plant Hire', 'Plant Hire', 5000)
      }
    }
  }
}
</script>
