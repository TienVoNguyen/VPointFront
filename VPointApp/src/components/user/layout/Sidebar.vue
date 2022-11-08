<template>
  <!-- End Main Sidebar -->

  <div class="main-navbar sticky-top bg-white">
    <!-- Main Navbar -->
    <nav class="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
      <form action="#" class="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
        <div class="input-group input-group-seamless ml-3">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-search"></i>
            </div>
          </div>
          <input class="navbar-search form-control" type="text" placeholder="Search for something..."
                 aria-label="Search"></div>
      </form>
      <ul class="navbar-nav border-left flex-row ">
        <li class="nav-item border-right dropdown notifications">
          <a class="nav-link nav-link-icon text-center" href="#" role="button" id="dropdownMenuLink"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="nav-link-icon__wrapper">
              <i class="material-icons">&#xE7F4;</i>
              <span class="badge badge-pill badge-danger">2</span>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-small" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">
              <div class="notification__icon-wrapper">
                <div class="notification__icon">
                  <i class="material-icons">&#xE6E1;</i>
                </div>
              </div>
              <div class="notification__content">
                <span class="notification__category">Analytics</span>
                <p>Your website’s active users count increased by
                  <span class="text-success text-semibold">28%</span> in the last week. Great job!</p>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class="notification__icon-wrapper">
                <div class="notification__icon">
                  <i class="material-icons">&#xE8D1;</i>
                </div>
              </div>
              <div class="notification__content">
                <span class="notification__category">Sales</span>
                <p>Last week your store’s sales count decreased by
                  <span class="text-danger text-semibold">5.52%</span>. It could have been worse!</p>
              </div>
            </a>
            <a class="dropdown-item notification__all text-center" href="#"> View all Notifications </a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link text-nowrap px-3">
            <img class="user-avatar rounded-circle mr-2" src="@/assets/images/avatar.png" alt="User Avatar">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ currentUser.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button type="text" @click="handleProfileLayout">Thông tin cá nhân</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="removeValidate1(true)">Đổi mật khẩu</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="logOut">Đăng xuất</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </a>
        </li>
      </ul>

      <nav class="nav">
        <a href="#" class="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left"
           data-toggle="collapse" data-target=".header-navbar" aria-expanded="false" aria-controls="header-navbar">
          <i class="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    </nav>

    <el-dialog :append-to-body="true" :visible.sync="dialogFormVisible" width="30%" class="text-center">
      <span slot="title" style="width: 214px;
height: 42px;
left: 230px;
top: 100px;

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 42px;

color: #246CD9;">Đổi mật khẩu</span>
      <el-form>
        <el-form-item label="Nhập mật cũ">
          <el-input v-model="changePass.oldPassword" type="password" autocomplete="off" show-password></el-input>
          <small v-if="oldPass != null" style="color: red">{{oldPass}}</small>
        </el-form-item>
        <el-form-item label="Nhập mật khẩu mới">
          <el-input v-model="changePass.newPassword" type="password" autocomplete="off" show-password></el-input>
          <small v-if="errP1 != null" style="color: red">{{errP1}}</small>
        </el-form-item>
        <el-form-item label="Xác nhận mật khẩu mới">
          <el-input v-model="changePass.confirmNewPassword" type="password" autocomplete="off" show-password></el-input>
          <small v-if="errorsPass != null" style="color: red">{{errorsPass}}</small>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click.prevent="RepassUser(currentUser.id)">Confirm</el-button>
        <!--        <pre>{{changePass}}</pre>-->
  </span>
    </el-dialog>

  </div>

</template>
<script>
import authService from "@/service/auth-service";
import swal from "sweetalert2";

export default {
  name: "SidebarComponent",
  data: function () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,

      oldPass: '',

      errorsPass: '',
      errP1: '',
      check1: true,
      check: true,
      formLabelWidth: '120px',
      changePass: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',

      },
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
  methods: {
    handleProfileLayout() {
      this.$emit('clickOpenProfile');
    },
    removeValidate1(check) {
      this.dialogFormVisible = check
      this.oldPass = ''
      this.errP1 = ''
      this.errorsPass = ''
    },
    validPass: function (pass) {
      var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      return re.test(pass);
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    RepassUser(userId) {
      if (!this.changePass.newPassword && this.changePass.confirmNewPassword || !this.changePass.newPassword && !this.changePass.confirmNewPassword) {
        this.errP1 = 'Vui lòng nhập mật khẩu mới'
        this.check = false;
      } else if (!this.validPass(this.changePass.newPassword)) {
        this.errP1 = 'Mật khẩu gồm 8 ký tự trở lên có ít nhất một số và một chữ hoa và chữ thường'
      } else {
        this.errP1 = ''
        this.check = true;
      }
      if (this.changePass.newPassword && this.changePass.confirmNewPassword && !this.changePass.oldPassword){
        this.oldPass = 'Nhập mật khẩu cũ'
        this.check = false;
      } else if (this.changePass.newPassword && this.changePass.confirmNewPassword && this.changePass.oldPassword){
        this.oldPass = ''
        this.check = true;
      }
      if (this.changePass.newPassword && !this.changePass.confirmNewPassword) {
        this.errorsPass = 'Vui lòng xác nhận mật khẩu mới'
        this.check1 = false;
      } else if (this.changePass.newPassword !== this.changePass.confirmNewPassword) {
        this.errorsPass = 'Mật khẩu không trùng khớp'
        this.check1 = false;
      } else if (this.changePass.newPassword === this.changePass.confirmNewPassword) {
        this.errorsPass = ''
        this.check1 = true;
      }
      if (this.check1 === true && this.check === true) {
        authService.userRepass(userId, this.changePass)
            .then(
                async data => {
                  this.a = data.message;
                  if(this.changePass.oldPassword === this.changePass.newPassword){
                    this.dialogFormVisible1 = true;
                    this.errP1 = 'Trùng với mật khẩu cũ'
                  } else {
                    this.errP1 = ''
                    this.dialogFormVisible1 = false;
                    await swal.fire({
                          toast: true,
                          title: "Xong!",
                          icon: "success",
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000
                        }
                    )
                  }
                },
                () => {
                  this.oldPass = 'Mật khẩu cũ không chính xác'
                  this.dialogFormVisible = true;
                });
      }
    }
  }
}
</script>

<style scoped>

</style>
