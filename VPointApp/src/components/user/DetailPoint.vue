<template>

  <div class="container">
    <a href="/user/home"><i class="el-icon-arrow-left item-absolute">Quay lại</i></a>
    <h3 style="
  /*  margin-top: 2rem;*/
  /*margin-bottom: 2rem;*/
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 41px;
  color: #246CD9;">Điểm V-Point tháng {{month}} năm {{year}}</h3>
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
    <br>
    <table class="table table-bordered justify-content-center"  :data="Point">
      <tr >
        <th >Stt</th>
        <th >Mục</th>
        <th >Hạng mục</th>
        <th >Điểm V-Point</th>
        <th >Tổng điểm theo mục</th>
      </tr>
      <tr >
        <td rowspan="2" class="vertical-center">1</td>
        <td rowspan="2" class="vertical-center text-left">Hiệu suất công việc</td>
        <td class="text-left">KPI cá nhân hàng tháng</td>
        <td>{{td1}}</td>
        <td class="vertical-center" rowspan="2" >{{ td1 + td2 + td9 + td10 + td16 + td17}}</td>
      </tr>
      <tr>

        <td class="text-left">Nhân viên xuất sắc, bộ phận xuất sắc</td>
        <td>{{td2 + td9 + td10 + td16 + td17}}</td>

      </tr>
      <tr>
        <td rowspan="2" class="vertical-center">2</td>
        <td rowspan="2" class="vertical-center text-left">Làm việc nhóm</td>
        <td class="text-left">Điểm bsc bộ phận</td>
        <td>{{td3}}</td>
        <td rowspan="2" class="vertical-center">{{td3 + td4}}</td>
      </tr>
      <tr>
        <td class="text-left">Hoạt động chung</td>
        <td>{{td4}}</td>
      </tr>
      <tr>
        <td>3</td>
        <td class="text-left">Đào tạo và phát triển</td>
        <td class="text-left">Đào tạo</td>
        <td>{{td5 + td11 + td12}}</td>
        <td>{{td5 + td11 + td12}}</td>
      </tr>
      <tr>
        <td>4</td>
        <td class="text-left">Sáng tạo</td>
        <td class="text-left">Cải tiến đổi mới</td>
        <td>{{td6}}</td>
        <td>{{td6}}</td>
      </tr>
      <tr>
        <td rowspan="2" class="vertical-center">5</td>
        <td rowspan="2" class="vertical-center text-left">Tuân thủ</td>
        <td class="text-left">Tôi yêu VMG</td>
        <td>{{td7 + td13}}</td>
        <td rowspan="2" class="vertical-center">{{td7 - td8 + td13}}</td>
      </tr>
      <tr>
        <td class="text-left">Kỷ luật</td>
        <td>{{td8}}</td>
      </tr>
      <tr >

        <td colspan="4" style="background-color: #dc3545; line-height: 25px; color: white" > Tổng điểm</td>
        <td style="line-height: 25px">{{Point.reduce((total, p)=>{return total += p.point},0)}}</td>
      </tr>
    </table>
  </div>


</template>

<script>

import {UserService as userService} from "@/service/user-service";
import moment from "moment";

export default {
  name: "DetailPoint",
  data: function (){
    return{
      Point: [],
      user: '',
      idUser: '',
      year : this.$route.params.year,
      month: this.$route.params.month,
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
      td13: 0,
      td14: 0,
      td15: 0,
      td16: 0,
      td17: 0,
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
    this.findByIdUser(this.currentUser.id)
  },


  methods: {
    findByIdUser : async function (userId) {
      let response = await userService.findById(userId);
      if (response) {
        this.user = response.data
      }
    },

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

      this.idUser = this.currentUser.id;
      const params = {};
      params["year"] = this.year
      params["month"] = this.month
      let response = await userService.getVpointByTime(this.idUser, params)
      this.Point = response.data
      for (let i = 0; i < this.Point.length; i++) {
        if (this.Point[i].item.id === 1){
          this.td1 = this.Point[i].point
        }
        if (this.Point[i].item.id === 2){
          this.td2 =this.Point[i].point
        }
        if (this.Point[i].item.id === 3){
          this.td3 = this.Point[i].point
        }
        if (this.Point[i].item.id === 4){
          this.td4 = this.Point[i].point
        }
        if (this.Point[i].item.id === 5){
          this.td5 = this.Point[i].point
        }
        if (this.Point[i].item.id === 6){
          this.td6 = this.Point[i].point
        }
        if (this.Point[i].item.id === 7){
          this.td7 = this.Point[i].point
        }
        if (this.Point[i].item.id === 8){
          this.td8 = this.Point[i].point
        }
        if (this.Point[i].item.id === 9){
          this.td9 = this.Point[i].point
        }
        if (this.Point[i].item.id === 10){
          this.td10 = this.Point[i].point
        }
        if (this.Point[i].item.id === 11){
          this.td11 = this.Point[i].point
        }
        if (this.Point[i].item.id === 12){
          this.td12 = this.Point[i].point
        }
        if (this.Point[i].item.id === 13){
          this.td13 = this.Point[i].point
        }
        if (this.Point[i].item.id === 14){
          this.td14 = this.Point[i].point
        }
        if (this.Point[i].item.id === 15){
          this.td15 = this.Point[i].point
        }
        if (this.Point[i].item.id === 16){
          this.td16 = this.Point[i].point
        }
        if (this.Point[i].item.id === 17){
          this.td17 = this.Point[i].point
        }
      }
    }
  }
}
</script>

<style scoped>
.item-absolute {
  position: absolute;
  top: 75px;
  left: 40px;
}
.vertical-center {
  line-height: 70px;
}
</style>
