<template>

  <div class="container">
    <h3 style="color: black">Điểm V-Point tháng {{month}} năm {{year}}</h3>
    <br><br>
    <table class="table table-bordered"  :data="Point">
      <tr >
        <th >Stt</th>
        <th >Mục</th>
        <th >Hạng mục</th>
        <th >Điểm V-Point</th>
        <th >Tổng điểm theo mục</th>
      </tr>
      <tr >
        <th rowspan="2">1</th>
        <td rowspan="2">Hiệu suất công việc</td>
        <td>KPI cá nhân hàng tháng</td>
        <td>{{td1}}</td>
        <td rowspan="2">{{ td1 + td2 + td9 + td10 + td16 + td17}}</td>
      </tr>
      <tr>

        <td>Nhân viên xuất sắc, bộ phận xuất sắc</td>
        <td>{{td2 + td9 + td10 + td16 + td17}}</td>

      </tr>
      <tr>
        <td rowspan="2">02</td>
        <td rowspan="2">Làm việc nhóm</td>
        <td>Điểm bsc bộ phận</td>
        <td>{{td3}}</td>
        <td rowspan="2">{{td3 + td4}}</td>
      </tr>
      <tr>
        <td>Hoạt động chung</td>
        <td>{{td4}}</td>
      </tr>
      <tr>
        <td>03</td>
        <td>Đào tạo và phát triển</td>
        <td>Đào tạo</td>
        <td>{{td5 + td11 + td12}}</td>
        <td>{{td5 + td11 + td12}}</td>
      </tr>
      <tr>
        <td>04</td>
        <td>Sáng tạo</td>
        <td>Cải tiến đổi mới</td>
        <td>{{td6}}</td>
        <td>{{td6}}</td>
      </tr>
      <tr>
        <td rowspan="2">05</td>
        <td rowspan="2">Tuân thủ</td>
        <td>Tôi yêu VMG</td>
        <td>{{td7 + td13}}</td>
        <td rowspan="2">{{td7 + td8 + td13}}</td>
      </tr>
      <tr>
        <td>Kỷ luật</td>
        <td>{{td8}}</td>
      </tr>
      <tr >
        <td>06</td>
        <td colspan="3" style="background-color: #dc3545"><h4>Tổng điểm</h4></td>
        <td>{{Point.reduce((total, p)=>{return total += p.point},0)}}</td>
      </tr>
    </table>
  </div>


</template>

<script>
import {UserService as userService} from "@/service/user-service";

export default {
  name: "DetailPoint",
  data: function (){
    return{
      Point: [],
      idUser: this.$route.params.idUser,
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

  async created() {
    await this.getVPoint()
  },


  methods: {
    async getVPoint() {
      console.log("1231232131")
      const params = {};
      params["year"] = this.year
      params["month"] = this.month
      // console.log(params)
      let response = await userService.getVpointByTime(this.idUser, params)
      this.Point = response.data
      console.log(this.Point);
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
          console.log(12, this.Point[i])
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
      console.log(11, this.td1)
      // console.log(this.td2)
      // console.log(this.td3)
      // console.log(this.td4)
      console.log(this.td5, "b")
      // console.log(this.td6)
      // console.log(this.td7)
      // console.log(this.td8)
      // console.log(this.td9)
      // console.log(this.td10)
      // console.log(this.td11)
      console.log(this.td12, "a")
      // console.log(this.td13)
      // console.log(this.td14)
      // console.log(this.td15)
      // console.log(this.td16)
      // console.log(this.td17)
    }
  }
}
</script>

<style scoped>

</style>
