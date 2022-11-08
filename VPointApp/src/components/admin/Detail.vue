
<template>

  <div>
    <br>
    <h3 class="header"> Điểm V-Point năm: {{selected}} </h3>
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

    <div class="justify-content-center row" >
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
<div class="col-4 text-right" >

  <h4 align="right" style="color: #6c757d">    Tổng điểm: {{sum}} </h4>

</div>

    </div>
    <div class="justify-content-center">
      <table class="table table-bordered " align="center" :data="Point" style="width: 70%;">
        <tr>
          <th>Tháng</th>
          <th>Điểm V-Point</th>
          <th>Tùy chọn</th>
        </tr>
        <tr>
          <td>Tháng 1</td>
          <td>{{td1}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${1}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 2</td>
          <td>{{td2}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${2}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 3</td>
          <td>{{td3}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${3}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 4</td>
          <td>{{td4}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${4}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 5</td>
          <td>{{td5}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${5}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 6</td>
          <td>{{td6}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${6}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 7</td>
          <td>{{td7}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${7}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 8</td>
          <td>{{td8}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${8}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 9</td>
          <td>{{td9}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${9}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 10</td>
          <td>{{td10}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${10}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 11</td>
          <td>{{td11}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${11}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
        <tr>
          <td>Tháng 12</td>
          <td>{{td12}}</td>
          <td><router-link :to="`/admin/AdminSeeDetailVPoint/${selected}/${12}/${idUser}`" class="btn btn-warning">Xem chi tiết</router-link></td>
        </tr>
      </table>
    </div>
  </div>



</template>
<script>
import moment from "moment";
import {UserService as userService} from "@/service/user-service";

export default {
  name: "DetailComponent",
  data() {
    return {
      user: '',
      idUser : this.$route.params.idUser,
      Point: [],
      search: '',
      year: [],
      selected: this.$route.params.year,
      sum: 0,
      td1: 0,
      td2: 0,
      td3: 0,
      td4: 0,
      td5: 0,
      td6: 0,
      td7: 0,
      td8: 0,
      td9: 0,
      td10: 0,
      td11: 0,
      td12: 0,
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
      console.log(this.Point)
      for (let i = 0; i < this.Point.length; i++) {
        this.sum += this.Point[i].sum
        if (this.formatMonth(this.Point[i].date) == 1){
          this.td1 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 2){
          this.td2 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 3){
          this.td3 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 4){
          this.td4 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 5){
          this.td5 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 6){
          this.td6 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 7){
          this.td7 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 8){
          this.td8 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 9){
          this.td9 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 10){
          this.td10 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 11){
          this.td11 = this.Point[i].sum
        }
        if (this.formatMonth(this.Point[i].date) == 12){
          this.td12 = this.Point[i].sum
        }
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
.header {
@import url('https://fonts.googleapis.com/css?family=Roboto');
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 41px;
  /* identical to box height */


  color: #246CD9;
}
</style>
