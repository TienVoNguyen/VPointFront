<template>
  <el-empty description="Bạn không có quyền truy cập!">
    <el-button @click="returnHome" type="primary">Home</el-button>
  </el-empty>
</template>

<script>
export default {
  name: "AccessRights",
  methods: {
    returnHome() {
      this.$router.push('/user/home')
    }
  }
}
</script>

<style scoped>

</style>