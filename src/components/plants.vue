<template lang="html">
  <section class="dashboard" style="overflow-y: auto">

    <div class="card">
      <div class="card-body">
        <div class="card-title">

          <form @submit.prevent="getAvailablePlants()">
            <div class="row">
              <div class="form-group col-md-3">
                <label for="fromLocation">Plant name</label>
                <input type="text" required v-model="name" class="form-control" id="plantName">
              </div>

              <div class="form-group col-md-3">
                <label for="fromLocation">Start date</label>
                <input type="date" required v-model="startDate" class="form-control" id="fromLocation">
              </div>

              <div class="form-group col-md-3">
                <label for="toLocation">End date</label>

                <input
                  type="date"
                  v-model="endDate"
                  required
                  class="form-control"
                  id="toLocation">
              </div>
              <div class="form-group col-md-3">
                <button v-if="!isLoading"
                        class="btn btn-dark btn-md" style="margin-top: 28px">Get available plants!
                </button>
                <vs-progress v-if="isLoading" indeterminate color="primary">primary</vs-progress>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="row" v-if="showPlants">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <div class="col-12">
                <span>Plants</span>

              </div>
              <hr>
            </div>

            <div class="table-responsive">
              <table class="table center-aligned-table">
                <thead>
                <tr>
                  <th class="border-bottom-0">Plant Name</th>
                  <th class="border-bottom-0">Description</th>
                  <th class="border-bottom-0">Price</th>
                  <th class="border-bottom-0"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="plant in plants">
                  <td>{{plant.name}}</td>
                  <td>{{plant.desc}}</td>
                  <td>{{formatPrice(plant.pricePerDay.total)}}</td>

                  <td v-if="user.role === 'SITE_ENGINEER'">
                    <div class="col-1 float-right" v-if="!showAddButton">
                      <vs-progress indeterminate color="primary" class="float-right">primary</vs-progress>
                    </div>
                    <button v-if="showAddButton" class="btn btn-outline-success btn-sm"
                            v-on:click="createPlantHire(plant)">Create Plant Hire
                    </button>
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-prevent"
      ref="modal"
      title="Create a hire request"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="createPlantHire"
            v-if="renderModal">
        <span>Plant name: {{selectedPlant.name}}, </span>
        <span style="margin-top: 10px">Price per day: {{selectedPlant.pricePerDay.total}}</span>

        <b-form-select required v-model="site" :options="sites" style="margin-top: 10px"></b-form-select>
        <b-form-select required v-model="supplier" :options="suppliers" style="margin-top: 10px"></b-form-select>
      </form>
    </b-modal>

  </section>

</template>

<script lang="js">
  import {RepositoryFactory} from '../repo/RepositoryFactory'

  export default {
    name: 'plants',
    data() {
      return {
        plants: [],
        isLoading: false,
        showPlants: false,
        repoName: 'inv',
        startDate: '',
        endDate: '',
        name: '',
        selectedPlant: {},
        renderModal: false,
        suppliers: [],
        sites: [],
        site: {},
        supplier: {},
        showAddButton: true,
        user: JSON.parse(localStorage.getItem('user'))

      }
    },
    mounted() {
      this.getSuppliers();
      this.getConstructionSites();
    },
    methods: {
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return "€ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      getPlantDetailURL(plant) {
        return `/plants/${plant._id}/detail`
      },
      async getAvailablePlants() {

        const vue = this;
        this.plants = [];
        this.showPlants = false;
        this.isLoading = true;
        const notify = this.notify;
        console.log(this.startDate);
        try {
          this.isLoading = true;
          const {data} = await RepositoryFactory.get(this.repoName).getPlants({
            name: vue.name,
            endDate: vue.endDate,
            startDate: vue.startDate
          });
          console.log(data);
          vue.isLoading = false;
          this.showPlants = true;
          vue.plants = data
        } catch (e) {
          vue.isLoading = false;
          notify.error('Uh oh, looks like we are having trouble at the backend', 'Error', 5000)
        }
      },
      createPlantHire(plant) {
        this.selectedPlant = plant;
        this.renderModal = true;
        this.$refs['modal'].show()
      },
      async handleOk(e) {
        this.showAddButton = false;
        const request = {
          constructionSiteId: this.site,
          supplierId: this.supplier,
          plantId: this.selectedPlant._id,
          plantHref: this.selectedPlant.href,
          rentalPeriod: {
            startDate: this.startDate,
            endDate: this.endDate
          }
        };
        try {
          const {data} = await RepositoryFactory.get(this.repoName).createPlantHire(request);
          console.log(data)
          this.showAddButton = true;
          this.notify.success('Great!!, Your plant hire request has been created', 'Plant Hire', 5000)
        } catch (e) {
          this.showAddButton = true;
          this.notify.error('Oops!!, An error occurred while creating the Plant Hire', 'Plant Hire', 5000)
        }
      },
      getSuppliers() {
        try {
          const data = RepositoryFactory.get("supplier").getSuppliers().then((data) => {
            console.log(data);
            this.suppliers = data;
            this.supplier = this.suppliers[0].value;
          });
        } catch (e) {
        }
      },
      getConstructionSites() {
        console.log('called');
        try {
          RepositoryFactory.get("cons").getConstructionSites().then((data) => {
            console.log(data);
            this.sites = data;
            this.site = this.sites[0].value;
          });
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
