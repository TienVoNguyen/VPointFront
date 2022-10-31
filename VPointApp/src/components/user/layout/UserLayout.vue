<template>
  <div class="main-content-container container-fluid px-4">
    <div class="row">
      <main-sidebar/>
      <main class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <sidebar/>

            <router-view/>

      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/user/layout/Sidebar";
import MainSidebar from "@/components/user/layout/MainSidebar";

export default {
  name: "AdminLayout",
  components: {
    Sidebar: Sidebar,
    MainSidebar: MainSidebar
  }
}
</script>

<style scoped>

</style>
