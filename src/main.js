// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuesax from 'vuesax'
import miniToastr from 'mini-toastr'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import moment from 'moment'

Vue.use(Vuesax);
Vue.use(BootstrapVue);
miniToastr.init();
Vue.prototype.notify = miniToastr;
Vue.config.productionTip = false;
Vue.prototype.moment = moment;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
