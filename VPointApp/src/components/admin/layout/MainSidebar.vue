<template>
  <!-- Main Sidebar -->
  <aside class="main-sidebar col-12 col-md-3 col-lg-2 px-0">
    <div class=" main-navbar ">
      <nav class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
        <a class="navbar-brand mr-0" href="#" style="line-height: 25px;">
          <div class="d-table m-auto">
            <img id="main-logo" class="d-inline-block align-top mr-1" style="max-width: 20%;"
                 src="https://vmgmedia.vn/Content/images/logo/01.png" alt="VMG Logo">
          </div>
        </a>
        <a class="toggle-sidebar d-sm-inline d-md-none d-lg-none">
          <i class="material-icons">&#xE5C4;</i>
        </a>
      </nav>
    </div>
    <form action="#" class="main-sidebar__search border-right d-sm-flex d-md-none d-lg-none">
      <div class="input-group input-group-seamless ml-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <i class="fas fa-search"></i>
          </div>
        </div>
        <input class="navbar-search form-control" type="text" placeholder="Search for something..."
               aria-label="Search"></div>
    </form>
    <div class="nav-wrapper text-left">
      <el-menu
          background-color="#DC143C"
          text-color="#FFFFFF"
          active-text-color="#FFFF00"
          default-active="1"
          class="el-menu-vertical-demo menuMain">
        <router-link to="/admin/home" style="text-decoration: none;">
          <el-menu-item @click="changeColor($event)" index="1">
            <i class="el-icon-s-home"></i>
            <span>Trang chủ</span>
          </el-menu-item>
        </router-link>
        <router-link to="/admin/my-v-point" style="text-decoration: none;">
          <el-menu-item @click="changeColor($event)" index="2">
            <i class="el-icon-finished text-white"></i>
            <span>V-Point của tôi </span>
          </el-menu-item>
        </router-link>
        <router-link to="/admin/v-point-manager" style="text-decoration: none;">
          <el-menu-item @click="changeColor($event)" index="3">
            <i class="el-icon-tickets text-white"></i>
            <span>Quản lý V-Point</span>
          </el-menu-item>
        </router-link>
        <router-link to="/admin/scoring-rules" style="text-decoration: none;">
          <el-menu-item @click="changeColor($event)" index="6">
            <i class="el-icon-s-finance text-white"></i>
            <span>Quản lý tính điểm</span>
          </el-menu-item>
        </router-link>
        <router-link to="/admin/user-manager" style="text-decoration: none;">
          <el-menu-item @click="changeColor($event)" index="4">
            <i class="el-icon-user-solid text-white"></i>
            <span>Quản lý người dùng</span>
          </el-menu-item>
        </router-link>
        <router-link to="/admin/department-manager" style="text-decoration: none;">
          <el-menu-item @click="changeColor($event)" index="5">
            <i class="el-icon-no-smoking text-white"></i>
            <span>Quản lý phòng ban</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
  </aside>
</template>

<script>
export default {
  name: "MainSidebar",
  methods: {
    changeColor(event) {
      let menu = document.querySelector('.menuMain');
      [menu][0].__vue__.$children.forEach(el => {
        if (el.$children[0] === event) {
          event.$el.children[0].classList.remove('text-white')
        } else {
          // el.children[0].classList.add('text-white')
          el.$el.children[0].children[0].classList.add('text-white')
        }

      })
    }
  }
}
</script>

<style scoped>
.nav-wrapper {
  background-color: #DC143C;
  color: #FFFFFF;
}
</style>
