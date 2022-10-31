<template>
  <el-container>
    <div class="row">
      <div class="col col-lg-12">
        <div class="text-center">
          <h2 style="color: #6c757d">Điểm V-Point năm
            <span style="">
        <select  v-model="selected" @change="getVpointByYear(selected)" style="width: 120px; color: #6c757d; display: inherit; align-items: center" >
          <option v-for="y in year" v-bind:value="y"  v-bind:key ="y" >
            {{ y }}
          </option>
        </select>
      </span>
          </h2>
        </div>
        <br>
        <br>
        <br>
      </div>
      <div class="col col-lg-12" align="center">
        <el-table align="center"
                  :data="Point"
                  style="width: 70%">
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
              label="Điểm V-poin"
              width="180">
          </el-table-column>
          <el-table-column
              label="Tùy chọn"
              align="center">

            <template slot-scope="scope">
              <router-link :to="`api/mark/${formatYear(scope.row.date)}/${formatMonth(scope.row.date)}`" class="btn btn-warning">Xem chi tiết</router-link>
            </template>
          </el-table-column>
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

</style>
