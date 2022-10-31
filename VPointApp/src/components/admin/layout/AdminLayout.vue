<template>
  <div class="main-content-container container-fluid">
    <div class="row">
      <main-sidebar-component/>
      <main class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <sidebar-component/>
          <div class="col-lg-12 col-md-6 col-sm-6 p-0" style="height: 515px">
            <router-view/>
          </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/admin/layout/Sidebar";
import MainSidebar from "@/components/admin/layout/MainSidebar";

export default {
  name: "AdminLayoutComponent",
  components: {
    SidebarComponent: Sidebar,
    MainSidebarComponent: MainSidebar
  }
}
</script>

<style scoped>

</style>