<template lang="html">

  <section class="dashboard">

    <div class="row">

      <div class="col-12 grid-margin">

        <div class="col-4  grid-margin stretch-card" style="margin: 0 auto" v-if="isLoading">
          <div class="card">
            <div class="card-body">
              <vs-progress indeterminate color="primary">primary</vs-progress>
            </div>
          </div>
        </div>
        <div class="card" v-if="!isLoading">
          <div class="card-body">
            <h5 class="card-title mb-4">Plant hires</h5>
            <div class="table-responsive">
              <table class="table center-aligned-table">
                <thead>
                <tr>
                  <th class="border-bottom-0">Name</th>
                  <th class="border-bottom-0">Cost</th>
                  <th class="border-bottom-0">From</th>
                  <th class="border-bottom-0">To</th>
                  <th class="border-bottom-0">Requester</th>
                  <th class="border-bottom-0">address</th>
                  <th class="border-bottom-0">Supplier</th>
                  <th class="border-bottom-0">Status</th>
                  <th class="border-bottom-0">PO status</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(hire) in hires">

                  <td>{{hire.plant.name}}</td>
                  <td>{{formatPrice(hire.rentalCost.total)}}</td>
                  <td>{{formatDate(hire.rentalPeriod.startDate)}}</td>
                  <td>{{formatDate(hire.rentalPeriod.endDate)}}</td>
                  <td>{{hire.requestingSiteEngineer.name}}</td>
                  <td>{{hire.site.address}}</td>
                  <td>{{hire.supplier.name}}</td>

                  <td v-if="hire.status === 'PENDING'">
                    <label class="badge badge-info">{{hire.status}}</label>
                  </td>
                  <td v-if="hire.status === 'REJECTED'">
                    <label class="badge badge-danger">{{hire.status}}</label>
                  </td>

                  <td v-if="hire.status === 'ACCEPTED'">
                    <label class="badge badge-success">{{hire.status}}</label>
                  </td>


                  <td v-if="hire.status === 'CANCELLED'">
                    <label class="badge badge-warning">{{hire.status}}</label>
                  </td>

                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status === 'PENDING'">
                    <label class="badge badge-info">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>

                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status === 'REJECTED'">
                    <label class="badge badge-danger">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>

                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status === 'ACCEPTED'">
                    <label class="badge badge-success">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>

                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status=== 'CANCELLED'">
                    <label class="badge badge-warning">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>

                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status=== 'EXTENSION_REQUESTED'">
                    <label class="badge badge-primary">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>

                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status=== 'EXTENSION_ACCEPTED'">
                    <label class="badge badge-primary">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>

                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status=== 'INVOICED'">
                    <label class="badge badge-warning">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>
                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status=== 'PAID'">
                    <label class="badge badge-success">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>

                  <td
                    v-if="hire.purchaseOrder && (hire.purchaseOrder.status=== 'INVOICED' ||  hire.purchaseOrder.status=== 'PAID')">
                    <div class="row">
                      <button v-if="hire.purchaseOrder.status=== 'INVOICED'" class="btn btn-outline-warning btn-sm"
                              v-on:click="viewInvoice(hire)">
                        View Invoice
                      </button>

                      <button v-if="hire.purchaseOrder.status=== 'PAID'" class="btn btn-outline-success btn-sm" v-on:click="viewInvoice(hire)">
                        View Invoice
                      </button>
                    </div>
                  </td>

                  <td v-if="hire.purchaseOrder && hire.purchaseOrder.status=== 'PLANT_DISPATCHED'">
                    <label class="badge badge-primary">{{hire.purchaseOrder.status.replace('_',' ')}}</label>
                  </td>

                  <td v-if="!hire.purchaseOrder">
                    N/A
                  </td>


                  <td v-if="canRequestExtension(hire)">
                    <div class="row">
                      <button class="btn btn-outline-primary btn-sm" v-on:click="requestExtensionHire(hire)">Request
                        Extension
                      </button>
                    </div>
                  </td>

                  <!-- <td v-if="hire.status === 'REJECTED'">
                     <div class="row">
                       <button class="btn btn-primary btn-sm"
                               v-on:click="showComments(hire)">Comments
                       </button>
                     </div>
                   </td>-->
                  <td v-if="hire.status === 'PENDING'">
                    <div class="row">
                      <button class="btn btn-info btn-sm" v-on:click="toUpdatePage(hire)">Edit
                      </button>
                    </div>
                  </td>
                  <td v-if="hire.status === 'PENDING' && user.role === 'WORKS_ENGINEER'">
                    <div class="row">
                      <button class="btn btn-success btn-sm" v-on:click="approveHire(hire)">Approve
                      </button>
                    </div>
                  </td>

                  <td v-if="canCancelPHR(hire)">
                    <div class="row">
                      <button class="btn btn-warning btn-sm" v-on:click="cancelHireRequest(hire)">Cancel
                      </button>
                    </div>
                  </td>
                  <td v-if="hire.status === 'PENDING'  && user.role === 'WORKS_ENGINEER' ">
                    <div class="row">
                      <button class="btn btn-danger btn-sm"
                              v-on:click="rejectHire(hire)">Reject
                      </button>
                    </div>
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
      ref="reject-modal"
      title="Why are you rejecting this Plant Hire Request?"
      @ok="handleOkRejectHire"
    >
      <form @submit.stop.prevent>
        <b-form-group label="Reason">
          <b-form-textarea v-model="rejectReason" placeholder="" rows="3" size="lg"></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>


    <b-modal
      id="modal-prevent"
      ref="extension-modal"
      title="Request extension"
      @ok="handleOkRequestExtension"
    >
      <form @submit.stop.prevent>
        <b-form-group label="New end date">
          <b-form-input type="date" v-model="extension.endDate" placeholder="" rows="3" size="lg"></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="comments-modal"
      ref="comments-modal"
      title="Comments"
    >
      <b-list-group>
        <b-list-group-item v-for="comment in selectedHire.comments">{{comment.comment}}</b-list-group-item>
      </b-list-group>

    </b-modal>

  </section>

</template>

<script>
  import {RepositoryFactory} from '../repo/RepositoryFactory';

  export default {
    name: 'dashboard',
    data() {
      return {
        hires: [],
        renderModal: false,
        selectedHire: {},
        comment: '',
        isLoading: true,
        isLoadingComments: false,
        updating: false,
        rejectReason: "",
        user: JSON.parse(localStorage.getItem('user')),
        extension: {
          endDate: '',
        }
      }
    },
    mounted() {
      this.getPlantHires()
    },
    methods: {
      getPOStatus(hire) {
        return hire.purchaseOrder ? hire.purchaseOrder.status.replace('_', ' ') : 'N/A';
      },
      canRequestExtension(hire) {
        return localStorage.role === 'SITE_ENGINEER' && (hire.purchaseOrder && (hire.purchaseOrder.status === 'ACCEPTED' || hire.purchaseOrder.status === 'PLANT_DISPATCHED'));
      },
      showComments(hire) {
        try {
          this.selectedHire = hire;
          this.$refs['comments-modal'].show();
        } catch (error) {
        }
      },
      viewInvoice(hire) {
        this.$router.push({name: 'invoice', params: {hire: hire}});
      },
      async handleOkRejectHire() {
        try {
          const payload = {
            comment: this.rejectReason
          }
          this.isLoading = true;
          const {data} = await RepositoryFactory.get("inv").rejectPlantHire(this.selectedHire._id, payload)
          console.log(data);
          this.selectedHire.status = 'REJECTED';
          this.isLoading = false;
          this.getPlantHires();
        } catch (e) {
          this.isLoading = false;
          console.log(e)
        }
      },
      toUpdatePage(hire) {
        this.$router.push({name: 'update-plant', params: {hire: hire}});
      },
      async approveHire(hire) {
        this.selectedHire = hire;
        try {
          this.isLoading = true;
          const {data} = await RepositoryFactory.get("inv").acceptPlantHire(hire._id)
          console.log(data);
          this.selectedHire.status = 'ACCEPTED';
          this.isLoading = false;
          this.getPlantHires();
        } catch (e) {
          this.isLoading = false;
          this.showError();
        }
      },
      rejectHire(hire) {
        this.selectedHire = hire;
        this.renderModal = true;
        this.$refs['reject-modal'].show()
      },
      async handleOkRequestExtension(e) {
        e.preventDefault();
        const hireEndDate = this.selectedHire.rentalPeriod.endDate;
        const newEndDate = this.extension.endDate;
        console.log(newEndDate);
        const numberOfDays = this.getDaysBetween(hireEndDate, newEndDate);
        console.log(numberOfDays);
        if (numberOfDays <= 0) {
          this.notify.info('Sorry extension should be at least a day', 'Extension', 5000)
        } else {
          try {
            this.$refs['extension-modal'].hide()
            this.isLoading = true;
            const {data} = await RepositoryFactory.get('inv').requestExtensionHire(this.selectedHire._id, this.extension);
            console.log(data);
            this.isLoading = false;

          } catch (e) {
            console.log(e);
            this.isLoading = false;
          }
        }
      },
      requestExtensionHire(hire) {
        this.selectedHire = hire;
        this.extension.endDate = this.selectedHire.rentalPeriod.endDate;
        console.log(this.extension);
        this.renderModal = true;
        this.$refs['extension-modal'].show()
      },
      canCancelPHR(hire) {
        if (localStorage.role !== 'SITE_ENGINEER') {
          return false;
        }
        const statuses = ['REJECTED', 'CANCELLED', 'PLANT_DISPATCHED', 'INVOICED', 'PLANT_RETURNED', 'INVOICED','PAID'];
        let canCancel = true;
        statuses.some((status) => {
          if (status === hire.status) {
            canCancel = false;
            return true
          } else if (hire.purchaseOrder != null && hire.purchaseOrder.status === status) {
            canCancel = false;
            return true
          }
        });
        return canCancel;
      },
      async getPlantHires() {
        try {
          this.isLoading = true;
          const {data} = await RepositoryFactory.get("inv").getPlantHires()
          console.log(data)
          this.hires = data;
          this.isLoading = false;
        } catch (e) {
          this.showError();
        }
      },
      async cancelHireRequest(hire) {
        try {
          this.isLoading = true
          const {data} = await RepositoryFactory.get("inv").cancelHireRequest(hire._id)
          console.log(data);
          this.isLoading = false;
          this.getPlantHires()
        } catch (error) {
          console.log(error);
          this.showError()
        }
      },
      showError() {
        this.notify.error('Uh oh, looks like we are having trouble connecting to our boss at the backend', 'Error', 5000)
      },
      formatDate(date) {
        this.moment().year()
        return this.moment(date, "YYYY-MM-DD").format('dddd, YYYY-MM-DD')
      },
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return "€ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      getDaysBetween(startDate, endDate) {
        startDate = this.moment(startDate, "YYYY-MM-DD");
        endDate = this.moment(endDate, "YYYY-MM-DD");
        return endDate.diff(startDate, 'days')
      },
    }
  }
</script>
