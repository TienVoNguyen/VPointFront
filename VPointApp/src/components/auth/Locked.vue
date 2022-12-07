<template>
  <div>
    <el-row>

      <el-result icon="error" subTitle="Tài khoản của bạn đã bị khóa. Vui lòng liên hệ bộ phận nhân sự!">
        <template slot="extra">
          <el-button type="primary" @click="logOut" size="medium">Đăng nhập lại</el-button>
        </template>
      </el-result>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LockedComponent",
  methods: {
    handleProfileLayout() {
      this.$emit('clickOpenProfile');
    },
    handleChangePassLayout() {
      this.$emit('clickOpenChangePass')
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