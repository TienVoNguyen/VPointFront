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
                  <el-button type="text" @click="handleChangePassLayout">Đổi mật khẩu</el-button>
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
  </div>

</template>
<script>
export default {
  name: "SidebarComponent",
  data: function () {
    return {
      formLabelWidth: '120px',
    };

  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    check() {
      if (this.currentUser().status === false){
        this.logOut()
      }
    }
  },
  methods: {
    handleProfileLayout() {
      this.$emit('clickOpenProfile');
    },
    handleChangePassLayout() {
      this.$emit('clickOpenChangePass');
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  }
}
</script>

<style scoped>

</style>
