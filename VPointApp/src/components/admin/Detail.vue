
<template>


  <div>
    <br>
    <h3 align="center" style="color: #6c757d"> Điểm V-Point năm: {{selected}} </h3>
    <br><br>
    <el-form :model="user" id="userForm" class="text-left">
      <div class="row text-start" >
        <div class="col-1"></div>
        <div class="col-10">
          <div class="row text-start" >
            <div class="col-4 ">
              <el-form-item prop="fullname">
                <label for="fullname" >Họ và tên:</label>
                <el-input name= "fullname" v-model="user.fullName" autocomplete="off" disabled></el-input>
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item prop="staffId">
                <label for="staffId">Mã nhân sự:</label>
                <el-input name= "staffId" v-model="user.staffId" autocomplete="off" disabled></el-input>
              </el-form-item>

            </div>
            <div class="col-4 text-start">
              <el-form-item prop="email">
                <label for="email">Email đăng nhập:</label>
                <el-input type="email" name= "email" v-model="user.email" autocomplete="off" disabled></el-input>
              </el-form-item>

            </div>
          </div>
        </div>
        <div class="col-1"></div>



      </div>
    </el-form>

    <div class="text-center">
      <h4 style="color: #6c757d"> Chọn năm: <span style="">
        <select class="form-control" v-model="selected" @change="getVpointByYear(selected)" style="width: 200px; display: inherit; align-items: center" >
          <option v-for="y in year" v-bind:value="y"  v-bind:key ="y" >
            {{ y }}
          </option>
        </select>
      </span>

      </h4>
    </div>

    <br>


    <div>
      <el-table
          :data="Point"
          style="width: 100%">
        <el-table-column align="center"
                         label="Thời gian"
                         width="300">
          <template slot-scope="scope">
            <p height="50px">
              tháng {{formatMonth(scope.row.date)}} năm {{formatYear(scope.row.date)}}
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="sum"
                         label="Điểm V-poin"
                         width="300">
        </el-table-column>
        <el-table-column align="center"
                         label="Tùy chọn">
          <template slot-scope="scope">
            <router-link :to="`/admin/AdminSeeDetailVPoint/${formatYear(scope.row.date)}/${formatMonth(scope.row.date)}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <br>

      <h4 align="center" style="color: #6c757d"> Tổng điểm: {{sum}} </h4>
    </div>
  </div>



</template>
<script>
import moment from "moment";
import {UserService as userService} from "@/service/user-service";

export default {
  name: "AdminSeeDetail",
  data() {
    return {
      user: '',
      idUser : this.$route.params.idUser,
      Point: [],
      search: '',
      year: [],
      selected: this.$route.params.year,
      sum: 0
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getVPoint()
    this.findByIdUser(this.idUser)
  },

  methods: {
    formatYear(value){
      if (value) {
        return moment(String(value)).format('YYYY')
      }
    },

    formatMonth(value){
      if (value) {
        return moment(String(value)).format('MM')
      }
    },

    async getVPoint() {
      let params = this.getRequestParams(this.selected)
      let response = await userService.getVpointByYear(this.idUser, params)
      this.Point = response.data
      for (let i = 0; i < this.Point.length; i++) {
        this.sum += this.Point[i].sum
      }
      let response1 = await userService.getYear(this.idUser)
      for (let i = 0; i < response1.data.length; i++) {
        this.year.push(this.formatYear(response1.data[i].date))
      }
    },
    findByIdUser : async function (userId) {
      let response = await userService.findById(userId);
      if (response) {
        this.user = response.data
      }
    },

    async getVpointByYear(params) {
      this.sum = ''
      let params1 = this.getRequestParams(params)
      let response = await userService.getVpointByYear(this.idUser, params1)
      this.Point = response.data
      for (let i = 0; i < this.Point.length; i++) {
        this.sum += this.Point[i].sum
      }
      console.log(this.Point)
    },

    getRequestParams(page) {
      let params = {};
      if (page) {
        params["year"] = page;
      }
      return params;
    },

  }
}
</script>

<style scoped>

</style>
