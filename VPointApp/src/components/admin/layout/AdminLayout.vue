<template>
  <div class="main-content-container container-fluid">
    <div class="row">
      <main-sidebar-component/>
      <main class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <sidebar-component v-on:clickOpenProfile="handleOpenProfile" v-on:clickOpenChangePass="handleOpenChangePass"/>
          <div class="col-lg col-md-6 col-sm-6 p-1">
            <router-view/>
          </div>
      </main>
    </div>
    <ChangePass :toggeChangePass="dialogChangeVisible" v-on:closeChangePass="handleCloseChangePass"></ChangePass>
    <ProfileVue :toggeProfile="dialogProfileVisible" v-on:closeProfile="handleCloseProfile"></ProfileVue>
  </div>
</template>

<script>
import Sidebar from "@/components/admin/layout/Sidebar";
import MainSidebar from "@/components/admin/layout/MainSidebar";
import ProfileVue from "@/components/share/Profile.vue";
import ChangePass from "@/components/share/ChangePass";

export default {
  name: "AdminLayoutComponent",
  data() {
    return {
      dialogProfileVisible: false,
      dialogChangeVisible : false
    }
  },
  methods: {
    handleOpenProfile() {
      this.dialogProfileVisible = true;
    },
    handleCloseProfile() {
      this.dialogProfileVisible = false;
    },
    handleOpenChangePass() {
      this.dialogChangeVisible = true;
    },
    handleCloseChangePass() {
      this.dialogChangeVisible = false;
    },
  },
  components: {
    ChangePass: ChangePass,
    SidebarComponent: Sidebar,
    MainSidebarComponent: MainSidebar,
    ProfileVue: ProfileVue,
  }
}
</script>

<style scoped>

</style>
