<template>
  <div class="main-content-container container-fluid">
    <div class="row">
      <main-sidebar-component/>
      <main class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <sidebar-component v-on:clickOpenProfile="handleOpenProfile"/>

          <div class="col-lg col-md-6 col-sm-6 mb-4 mt-4">
            <router-view/>
          </div>
      </main>
    </div>
    <ProfileVue :toggeProfile="dialogProfileVisible" v-on:closeProfile="handleCloseProfile"></ProfileVue>
  </div>
</template>

<script>
import Sidebar from "@/components/admin/layout/Sidebar";
import MainSidebar from "@/components/admin/layout/MainSidebar";
import ProfileVue from "@/components/share/Profile.vue";

export default {
  name: "AdminLayoutComponent",
  data() {
    return {
      dialogProfileVisible: false,
    }
  },
  methods: {
    handleOpenProfile() {
      this.dialogProfileVisible = true;
    },
    handleCloseProfile() {
      this.dialogProfileVisible = false;
    }
  },
  components: {
    SidebarComponent: Sidebar,
    MainSidebarComponent: MainSidebar,
    ProfileVue: ProfileVue,
  }
}
</script>

<style scoped>

</style>