import Vue from 'vue'
import Router from 'vue-router'
import plants from '../components/plants.vue'
import dashboard from '../components/dashboard.vue'
import updatePlantHire from '../components/updatePlantHire'
import login from '../components/login.vue'
import invoiceDetail from '../components/invoiceDetail'

Vue.use(Router)



const router = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [{
            path: 'auth',
            name: 'auth',
            component: login
        }, {
            path: '/',
            name: 'dashboard',
            component: dashboard
        },
        {
            path: '/plants',
            name: 'plants',
            component: plants
        },
        {
            name: 'update-plant',
            path: '/hire/update',
            props: true,
            component: updatePlantHire
        },
        {
            name: 'invoice',
            path: '/hire/invoice',
            props: true,
            component: invoiceDetail
        }
    ]
})

router.beforeEach((to, from, next) => {
    const loggedInd = localStorage.loggedIn === 'true';
    if(loggedInd){
      if(to.path === '/auth'){
        next(false);
        return;
      }
    }else{
      if (to.path !== '/auth'){
        next('/auth');
        return;
      }
    }
    next();

});

export default router;
