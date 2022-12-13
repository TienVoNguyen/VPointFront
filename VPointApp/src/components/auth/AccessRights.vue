<template>
  <div>
    <el-empty v-if="currentUser.status === true" description="Bạn không có quyền truy cập!">
      <el-button @click="returnHome" type="primary">Home</el-button>
    </el-empty>

    <el-empty v-if="currentUser === 'User has locked'" description="Tài khoản của bạn đã bị khóa! Vui lòng liên hệ bộ phận nhân sự để biết thêm chi tiết!">
      <el-button @click="logOut" type="primary">Đăng nhập lại</el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: "AccessRights",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    returnHome() {
      this.$router.push('/user/home')
    },
    login() {
      this.$router.push('/login')
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