<template>
  <el-container>
    <div class="row mt-4">
      <div class="col col-lg-12">
        <div class="text-center">
          <h2 class="headerVPoint" style="text-align: center;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 41px;
    color: #246CD9;">Thông tin điểm V-Point
          </h2>
        </div>
        <br>
        <br>
        <el-form :model="user" id="userForm" class="text-left">
          <div class="row text-start" >
            <div class="col-2"></div>
            <div class="col-8">
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
            <div class="col-2"></div>



          </div>
        </el-form>
        <div class="justify-content-center row">
          <div class="col-4" >
            <h4 align="left" style="color: #6c757d"> Chọn năm: <span style="">
        <select class="form-control" v-model="selected" @change="getVpointByYear(selected)" style="width: 200px; display: inherit; align-items: center" >
          <option v-for="y in year" v-bind:value="y"  v-bind:key ="y" >
            {{ y }}
          </option>
        </select>

      </span>

            </h4>
          </div>
          <!--      <div class="col-1"></div>-->
          <div class="col-4 text-right" >

            <h4 align="right" style="color: #6c757d">    Tổng điểm: {{sum}} </h4>

          </div>

        </div>
      </div>
      <div class="col col-lg-12" align="center">
        <el-table align="center"
                  :data="Point"
                  style="width: 70%">
          <el-table-column
              align="center"
              label="STT"
              width="80">
            <template v-slot="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              label="Thời gian"
              width="300">
            <template slot-scope="scope">
              tháng {{formatMonth(scope.row.date)}} năm {{formatYear(scope.row.date)}}
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              prop="sum"
              label="Điểm V-Point"
              width="180">
          </el-table-column>
          <el-table-column
              label="Tùy chọn"
              align="center">
            <template slot-scope="scope">
              <router-link :to="`/admin/AdminSeeDetailVPoint/${formatYear(scope.row.date)}/${formatMonth(scope.row.date)}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link>
            </template>
          </el-table-column>
<!--          -->
        </el-table>
      </div>
    </div>
  </el-container>
</template>

<script>

import {UserService as userService} from "@/service/user-service";
import moment from "moment";

export default {
  name: "UserHome",
  data() {
    return {
      idUser : '',
      Point: [],
      search: '',
      selected: new Date().getFullYear(),
      year: [],
      page: '',
      user: '',
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
    this.idUser = this.currentUser.id
    console.log(this.idUser)
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

    findByIdUser : async function (userId) {
      let response = await userService.findById(userId);
      if (response) {
        this.user = response.data
      }
    },

    async getVPoint() {
      if (this.currentUser != null) {
        this.idUser = this.currentUser.id;
      }
      let params = this.getRequestParams(this.selected)
      let response = await userService.getVpointByYear(this.idUser, params)
      this.Point = response.data
      for (let i = 0; i < this.Point.length; i++) {
        this.sum += this.Point[i].sum
        // this.Point[i].date = 'tháng ' + this.formatMonth(this.Point[i].date) + ' năm ' + this.formatYear(this.Point[i].date)
      }
      let response1 = await userService.getYear(this.idUser)
      for (let i = 0; i < response1.data.length; i++) {
        this.year.push(this.formatYear(response1.data[i].date))
      }
      console.log(this.year)
      console.log(this.Point)

    },

    async getVpointByYear(params) {
      console.log(params)
      if (this.currentUser != null) {
        console.log(this.currentUser)
        this.idUser = this.currentUser.id;
      }
      let params1 = this.getRequestParams(params)
      let response = await userService.getVpointByYear(this.idUser, params1)
      this.Point = response.data
      for (let i = 0; i < this.Point.length; i++) {
        this.sum += this.Point[i].sum
        // this.Point[i].date = 'tháng ' + this.formatMonth(this.Point[i].date) + ' năm ' + this.formatYear(this.Point[i].date)
      }
      this.Point = response.data
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
.headerVPoint {

}
</style>
