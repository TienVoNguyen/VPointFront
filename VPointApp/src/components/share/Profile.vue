<template>
  <div class="profile">
    <el-dialog 
      :visible="toggeProfile"
      @close="handleProfile"
      width="30%"
      >
      <span class="text-header" slot="title">Thông tin cá nhân</span>
      <el-row justify="">
        <el-col>
          <p><span class="text-title">Mã nhân viên:  </span> <span class="text-content"> {{user.staff_id}} </span></p>
          <p><span class="text-title">Họ tên:        </span> <span class="text-content"> {{user.name}} </span></p>
          <p><span class="text-title">Giới tính:     </span> <span class="text-content"> {{user.gender}} </span></p>
          <p><span class="text-title">Email:         </span> <span class="text-content"> {{user.mail}} </span></p>
          <p><span class="text-title">Số diện thoại: </span> <span class="text-content"> {{user.phone}} </span></p>
          <p><span class="text-title">Bộ phận:       </span> <span class="text-content"> {{user.department}} </span></p>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>

import { UserService } from '@/service/user-service';
export default {
  name: 'UserProfile',
  props: {
    toggeProfile: Boolean
  },
  data() {
    return {
      user: null,
      id: null,
    }
  },
  methods: {
    getProfileUser(id) {
      UserService.getProfileUserById(id)
        .then(response => {
          this.user = response.data;
          this.user.gender = this.user.gender == 'MALE' ? 'Nam' : 'Nữ';
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleProfile() {
      this.$emit('closeProfile');
    }
  },
  created() {
    this.id = JSON.parse(localStorage.getItem("user")).id;
    console.log(11, this.id);
    this.getProfileUser(this.id);
    console.log('object');
  },
}
</script>

<style scoped>

p {
  text-align: left;
  font-size: 16px;
}

.text-title {
  padding-left: 90px;
  display: inline-block;
  width: 220px;
}

.text-content {
  font-weight: bold;
}

.text-header {
  text-align: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 41px;
  /* identical to box height */


  color: #246CD9;
}

.profile {
  /* z-index: 100; */
  border-radius: 10px;
}
</style>