<template>
  <!-- <div>{{user}}</div> -->
  <div class="profile">
    <el-dialog 
      title="Thông tin cá nhân" 
      :visible="toggeProfile"
      @close="handleProfile"
      width="30%"
      >
      <el-row justify="">
        <el-col>
          <p>Mã nhân viên: {{user.staff_id}}</p>
          <p>Họ tên: {{user.name}}</p>
          <p>Giới tính: {{user.gender}}</p>
          <p>Ngày sinh: {{user.date}}</p>
          <p>Email: {{user.mail}}</p>
          <p>Số diện thoại: {{user.phone}}</p>
          <p>Bộ phận: {{user.department}}</p>
          <!-- <el-table :data="user">
            <el-table-column property="staff_id" width="150"></el-table-column>
            <el-table-column property="name" width="200"></el-table-column>
            <el-table-column property="gender"></el-table-column>
            <el-table-column property="date"></el-table-column>
            <el-table-column property="address"></el-table-column>
            <el-table-column property="address"></el-table-column>
            <el-table-column property="address"></el-table-column>
          </el-table> -->
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
      // toggeProfile: false,
    }
  },
  methods: {
    getProfileUser(id) {
      UserService.getProfileUser(id)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleProfile() {

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

<style>

.profile {
  z-index: 100;
}
</style>