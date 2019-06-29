<template>
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
          <h5 class="card-title mb-4">Invoice# {{invoice.invoiceNumber}}</h5>
          <div class="table-responsive">
            <table class="table center-aligned-table">
              <thead>
              <tr>
                <th class="border-bottom-0">Plant</th>
                <th class="border-bottom-0">Rented from</th>
                <th class="border-bottom-0">Date Returned</th>
                <th class="border-bottom-0">Total Cost</th>
                <th class="border-bottom-0">Issued Date</th>
                <th class="border-bottom-0">Due Date</th>
                <th class="border-bottom-0">Paid Date</th>
                <th class="border-bottom-0">Status</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="hire">
                <td>{{hire.plant.name}}</td>
                <td>{{formatDate(hire.rentalPeriod.startDate)}}</td>
                <td>{{formatDate(invoice.issuedDate)}}</td>
                <td>{{formatPrice(invoice.total)}}</td>
                <td>{{formatDate(invoice.issuedDate)}}</td>
                <td>{{formatDate(invoice.dueDate)}}</td>
                <td v-if="invoice.paidDate">{{formatDate(invoice.paidDate)}}</td>
                <td v-if="!invoice.paidDate">N/A</td>
                <td v-if="invoice.status === 'RECEIVED'">
                  <label class="badge badge-info">PENDING</label>
                </td>
                <td v-if="invoice.status === 'DUE'">
                  <label class="badge badge-warning">{{invoice.status}}</label>
                </td>
                <td v-if="invoice.status === 'PAID'">
                  <label class="badge badge-success">{{invoice.status}}</label>
                </td>

                <td v-if="invoice.status === 'RECEIVED' && user.role === 'SITE_ENGINEER'">
                  <div class="row">
                    <button class="btn btn-outline-primary btn-sm" v-on:click="makePayment()">
                      Make payment
                    </button>
                  </div>
                </td>

              </tr>
              <!--

                            <tr v-for="hire">
                              <td>{{hire.plant.name}}</td>
                              <td>{{formatPrice(invoice.total)}}</td>
                              <td>{{formatDate(hire.rentalPeriod.startDate)}}</td>
                              <td>{{formatDate(invoice.issuedDate)}}</td>
                              <td>{{formatDate(invoice.dueDate)}}</td>
                              <td v-if="invoice.paidDate">{{formatDate(invoice.paidDate)}}</td>
                              <td v-if="!invoice.paidDate">N/A</td>
                              <td v-if="invoice.status === 'RECEIVED'">
                                <label class="badge badge-info">PENDING</label>
                              </td>
                              <td v-if="invoice.status === 'DUE'">
                                <label class="badge badge-warning">{{invoice.status}}</label>
                              </td>
                              <td v-if="invoice.status === 'PAID'">
                                <label class="badge badge-succes">{{invoice.status}}</label>
                              </td>

                              <td v-if="invoice.status === 'RECEIVED'">
                                <div class="row">
                                  <button class="btn btn-outline-warning btn-sm" v-on:click="makePayment(invoice)">
                                    Make payment
                                  </button>
                                </div>
                              </td>

                            </tr>
              -->

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {RepositoryFactory} from "../repo/RepositoryFactory";

  export default {
    name: 'invoice-detail',
    props: ['hire'],
    data() {
      return {
        isLoading: this.hire == null,
        invoice: this.hire.purchaseOrder.invoiceDto,
        user: JSON.parse(localStorage.getItem('user'))
      }
    },
    created() {
      console.log(this.hire)
      if (this.hire == null) {
        this.getInvoices();
      }
    },
    methods: {
      async getInvoices() {
        this.isLoading = true;
        try {
          const {data} = await RepositoryFactory.get('inv').getInvoices();
          if (data) {
            this.invoice = data;
          } else {
            this.notify.warn('Uh oh, looks like that PO is invalid', 'Error', 5000)
          }
          this.isLoading = false;
        } catch (e) {
          console.log(e);
          this.isLoading = false;
          this.showError()
        }
      },
      async makePayment() {
        this.isLoading = true;
        try {
          const {data} = await RepositoryFactory.get("invoice").makePayment(this.invoice._id);
          this.invoice = data;
          this.isLoading = false;
        } catch (e) {
          console.log(e);
        }
      },
      formatDate(date) {
        return this.moment(date, "YYYY-MM-DD").format('dddd, YYYY-MM-DD')
      },
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return "€ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      showError() {
        this.notify.error('Uh oh, looks like we are having trouble connection to our boss at the backend', 'Error', 5000)
      }
    }
  }
</script>
