<template>
<div class="background">
  <h1 class="welcome">Chào mừng bạn đến với</h1>
  <h1 class="system">Hệ thống quản lý điểm V-Point</h1>
</div>
</template>

<script>
export default {
  name: "HomeComponent"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Great+Vibes');
@import url('https://fonts.googleapis.com/css?family=Playfair+Display');
.background {
  background-image: url('@/assets/images/backgroundhome.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  height: 100%;
}

.welcome {
  position: absolute;
  width: 514px;
  height: 90px;
  left: 240px;
  top: 158px;
  text-align: center;
  font-family: 'Great Vibes', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 72px;
  line-height: 90px;

  /* Black */

  color: #000000;
}

.system {
  position: absolute;
  width: 637px;
  height: 60px;
  left: 325px;
  top: 251px;

  text-align: center;

  font-family: 'Playfair Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 45px;
  line-height: 60px;
  /* identical to box height */
  /* 12 */
  color: #ED0033;

}
</style>