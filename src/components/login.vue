<template lang="html">

  <section class="login">

    <div class="wrapper d-flex align-items-center auth login-full-bg">

      <div class="col-12  grid-margin stretch-card" style="margin: 0 auto">
        <div class="card">
          <div class="card-body">
            <div class="col-lg-6 mx-auto">
              <div class="auth-form-dark text-left p-5" style="background: #03a9f3 !important;">
                <h2>Login</h2>
                <h4 class="font-weight-light">Hello! let's get started</h4>
                <form class="pt-5">
                  <form @submit.stop.prevent>
                    <div class="form-group">
                      <label for="username">Username</label>
                      <input type="text" class="form-control" v-model="loginPayload.username" id="username"
                             aria-describedby="emailHelp" placeholder="Username">
                      <i class="mdi mdi-account"></i>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" v-model="loginPayload.password"
                             id="exampleInputPassword1" placeholder="Password">
                      <i class="mdi mdi-eye"></i>
                    </div>
                    <div class="mt-4">
                      <button class="btn btn-block btn-primary btn-sm font-weight-small" v-on:click="login"
                              v-if="!isLoading">Login
                      </button>
                      <div class="col-3" style="margin: auto 0">
                        <vs-progress v-if="isLoading" indeterminate color="#FFF">white</vs-progress>
                      </div>
                    </div>
                  </form>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>

</template>

<script lang="js">
  import {RepositoryFactory} from "../repo/RepositoryFactory";

  export default {
    name: 'login',
    data() {
      return {
        isLoading: false,
        loginPayload: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async login() {
        if (this.validate()) {
          this.isLoading = true;
          try {
            const {data} = await RepositoryFactory.get('auth').login(this.loginPayload);
            if (data.error) {
              this.notify.info('Oops, invalid username/password combination', 'Login', 5000);
            } else {
              this.$emit('loggedIn',data)
            }
            this.isLoading = false;
          } catch (e) {
            console.log(e)
            this.isLoading = false;
          }
        }
      },
      validate() {
        if (!this.loginPayload.username) {
          this.notify.error('Please enter your username', 'Login', 5000);
          return false;
        } else if (!this.loginPayload.password) {
          this.notify.error('Please enter your password', 'Login', 5000);
          return false;
        }
        return true;
      },
    }
  }
</script>

<style scoped lang="scss">
  .login {
  }
</style>
