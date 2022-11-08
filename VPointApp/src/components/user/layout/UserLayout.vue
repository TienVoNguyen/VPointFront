<template>
  <div class="main-content-container container-fluid px-4">
    <div class="row">
      <main-sidebar/>
      <main class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <sidebar v-on:clickOpenProfile="handleOpenProfile" v-on:clickOpenChangePass="handleOpenChangePass"/>

            <router-view/>

      </main>
    </div>
    <ChangePass :toggeChangePass="dialogChangeVisible" v-on:closeChangePass="handleCloseChangePass"></ChangePass>
    <ProfileVue :toggeProfile="dialogProfileVisible" v-on:closeProfile="handleCloseProfile"></ProfileVue>
  </div>
</template>

<script>
import Sidebar from "@/components/user/layout/Sidebar";
import MainSidebar from "@/components/user/layout/MainSidebar";
import ProfileVue from "@/components/share/Profile.vue";
import ChangePass from "@/components/share/ChangePass";

export default {
  name: "AdminLayout",

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
    Sidebar: Sidebar,
    MainSidebar: MainSidebar,
    ProfileVue: ProfileVue,
  }
}
</script>

<style scoped>

</style>
