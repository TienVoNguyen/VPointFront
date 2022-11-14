<template>
  <div class="login-bg p-4">
    <div class="row justify-content-center pt-lg-3">
      <div class="col-md-12 col-lg-12">
        <h3 class="text-white">HỆ THỐNG QUẢN LÝ ĐIỂM V-POINT</h3>
      </div>
      <div class="col-md-3 col-lg-5">
        <div class="wrap">
          <div class="login-wrap p-md-4">
            <div class="d-flex">
              <div class="w-100">

                <h4 class="mb-4 text-uppercase"><img style="width: 20%" src="@/assets/images/01.png" alt="">
                  Đăng nhập hệ thống</h4>
              </div>
            </div>
            <form name="form" @submit.prevent="handleLogin">

              <div class="form-group row">
                <div class="col-sm-1"></div>
                <label class="control-label col-sm-3 p-2 text-left" for="email">Email<span
                    class="text-danger">*</span></label>
                <div class="col-sm-7">
                  <input v-model="user.email"
                         type="email"
                         class="form-control"
                         name="email"
                         id="email"
                         placeholder="Nhập email">
                </div>
                <div class="col-sm-1"></div>
<!--                  <small v-if="messageEmail" style="color: red;margin-left:200px; ">{{ messageEmail }}</small>-->
              </div>

              <div class="form-group row">
                <div class="col-sm-1"></div>
                <label class="control-label col-sm-3 p-2 text-left" for="password">Mật khẩu<span
                    class="text-danger">*</span></label>
                <div class="col-sm-7">
                  <input v-model="user.password"
                         type="password"
                         class="form-control"
                         name="password"
                         id="password"
                         placeholder="Nhập mật khẩu">
                </div>
                <div class="col-sm-1"></div>
<!--                <small v-if="messagePass !== null" style="color: red;">{{ messagePass }}</small>-->
              </div>

              <small v-if="messageForm" style="color: red; font-size: 15px">{{ messageForm }}</small>
              <small v-if="message" style="color: red; font-size: 15px" role="alert">{{ message }}</small>
              <div class="form-group mt-3 row justify-content-center">
                <button type="submit"
                        class="form-control col-md-3 col-lg-5 rounded submit px-3 buttonSubmit">Đăng nhập</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/models/user";

export default {
  name: "LoginComponent",
  data() {
    return {
      user: new User('', ''),
      message: '',
      a: '',
      check: true,
      messageEmail: '',
      messagePass: '',
      messageForm: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {

    if (this.loggedIn && this.currentUser.roles[0].authority === "ROLE_ADMIN") {
      this.$router.push('/admin/home');
    }
    if (this.loggedIn && this.currentUser.roles[0].authority === "ROLE_USER") {

      this.$router.push('/user/home');
    }
  },
  methods: {
    handleLogin() {
      if (!this.user.email && !this.user.password) {
        this.messageForm = 'Vui lòng nhập thông tin đăng nhập';
        this.message = '';
        this.check = false
      }
      if (!this.user.email && this.user.password) {
        this.messageForm = 'Vui lòng nhập email';
        this.message = '';
        this.check = false
      }
      if (!this.user.password && this.user.email) {
        this.messageForm = 'Vui lòng nhập mật khẩu';
        this.message = '';
        this.check = false
      }
      if (this.user.email && this.user.password) {
        this.check = true;
      }
      if (this.check === true) {
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              if (this.loggedIn && this.currentUser.roles[0].authority === "ROLE_ADMIN") {
                this.$router.push('/admin/home');
              }
              if (this.loggedIn && this.currentUser.roles[0].authority === "ROLE_USER") {
                this.$router.push('/user/home');
              }
            },
            error => {
              this.a = (error.response && error.response.data)
              this.messageEmail = '';
              this.messagePass = '';
              this.messageForm = 'Sai thông tin đăng nhập. Vui lòng kiểm tra lại';
              this.message = ''
            }
        );
      }
    }
  }
}
</script>

<style scoped>
.login-bg {
  background-image: url('@/assets/images/vmg-2192-2033.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  width: 100vw
}

.login-wrap {
  background-color: #FFFFFF;
  margin: 1.5rem;
  border-radius: 5%;
  height: 390px;
  width: 600px;
}

input {
  border: none;
  border-bottom: solid 1px #9C9797;
}

.buttonSubmit{
  background: rgba(249, 3, 3, 0.9);
  color: rgba(241, 246, 245, 0.9);
}

.buttonSubmit:hover {
  background: rgba(241, 246, 245, 0.9);
  color: rgba(249, 3, 3, 0.9);
}
</style>

