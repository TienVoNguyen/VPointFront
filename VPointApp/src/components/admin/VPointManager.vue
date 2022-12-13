<template>
  <el-container align="center">
    <div class="text-center">
      <br>
      <h2 class="vpointheader">Quản lý điểm V-Point</h2>
      <div class="d-flex justify-content-center mb-1">
        <input placeholder="Nhập tên để tìm kiếm" style="width: 385px; display: block" class="input-group-text text-left" type="text"
               v-model="fullName"
               @keyup="getUserListByCateIdAndName">

      </div>

      <div class="d-flex input-group mb-3 justify-content-center">

          <div class="text-left input-group-prepend d-inline-block">
            <p style="color: #6c757d"><span style="">
        <select class="form-control" v-model="CateId" @change="getUserListByCateIdAndName"
                style="width: 225px; display: inherit; align-items: center;">
          <option v-bind:value="''">Tất cả bộ phận</option>
          <option v-for="d in departments" :value="d.id" :key="d.id">
            {{ d.name }}
          </option>
        </select>
      </span>
            </p>
          </div>
          <p class="d-inline-block ml-4" style="color: #6c757d; margin-bottom: 2rem"> Năm: <span>
        <select class="form-control" v-model="selectedYear" @change="retrievePointList"
                style="width: 100px; display: inherit; align-items: center">
          <option v-for="y in year" v-bind:value="y" v-bind:key="y">

            {{ y }}
          </option>
        </select>
      </span></p>
      </div>
    </div>
    <div class="row">
      <div class=" col-lg-4 text-left input-group-prepend">
      </div>
      <div class="col-lg-8 d-flex justify-content-end" >
<!--        <el-button @click="sendMail" style="border: solid 1px; height: 50%; display: flex; align-items: center">Gửi Điểm</el-button>-->
        <el-button @click="toImport" style="border: solid 1px; height: 50%; display: flex; align-items: center"><i class="el-icon-upload2"></i>Import</el-button>
        <el-button @click="toExport" style="border: solid 1px; height: 50%; display: flex; align-items: center"> <i class="el-icon-download"></i>Export</el-button>
      </div>
    </div>
    <el-table border
              fixed="true"
              resizable="false"
              :data="listUser"
              style="width: 1350px; margin-right: auto; margin-left: auto">
      <el-table-column
          align="center"
          label="STT"
          width="100">
        <template v-slot="scope">
          <span>{{scope.$index +1 + index}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="staffId"
          label="Mã nhân viên"
          width="150">
      </el-table-column>
      <el-table-column
          prop="fullName"
          label="Họ và tên"
          width="300">
      </el-table-column>
      <el-table-column
          prop="department.name"
          label="Phòng ban"
          width="300">
      </el-table-column>
      <el-table-column
          vertical-align="middle"
          align="center"
          width="200"
          label="V-point">
        <template v-slot="scope">
            {{scope.row.password.length > 4? 0: scope.row.password}}
        </template>
      </el-table-column>
      <el-table-column align="center" class="w-100" style="width: 200px"
                       label="Tùy chọn">
        <template v-slot="scope">
          <el-tooltip class="item" effect="dark" content="Nhập điểm" placement="top">
            <i style="font-size: 18px; color: #0de3bb;" @click="removeValidate1(scope.row.id)"
               class="el-icon-plus"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Xem chi tiết" placement="top">
              <i style="font-size: 18px; color: #ff5900; margin-left: 50px" @click="router(scope.row.id, selectedYear)"
                 class="el-icon-view"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>


    <el-footer class="text-center">
      <el-pagination
          page-sizes="10"
          layout="prev, pager, next"
          :page-count="count"
          @current-change="handlePageChange"
          hide-on-single-page>
      </el-pagination>
    </el-footer>
  </el-container>

</template>
<script>
import {UserService as userService} from "@/service/user-service";
import authService from "@/service/auth-service";
import moment from "moment";
import ExcelService from "@/service/excel.service";
import swal from "sweetalert2";
export default {
  name: 'HomeComponent',
  data: function () {
    return {
      index: 0,
      CateId: '',
      fullName: '',
      UserId: '',
      pointU: '',
      size: 10,
      year: [],
      selectedYear: this.formatYear(new Date()),
      listPoint: [],
      listUser: [],
      listU: '',
      point: [],
      currentIndex: -1,
      page: 1,
      count: 0,
      roles: [],
      departments: [],

    }
  },
  async created() {
    this.UserId = this.currentUser.id
    this.getRoleId()
    await this.retrieveUserList();
    await this.retrievePointList()

    let response = await authService.getAllUser()
    this.listU = response.data;
    let response3 = await authService.adminGetYear()
    for (let i = 0; i < response3.data.length; i++) {
      this.year.push(this.formatYear(response3.data[i].date))
    }
    let response1 = await authService.getAllRole()
    this.roles = response1.data;
    let response2 = await authService.getAllDepartment()
    this.departments = response2.data;
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    formatYear(value) {
      if (value) {
        return moment(String(value)).format('YYYY')
      }
    },
    getRoleId() {
      for (let i = 0; i < this.currentUser.roles.length; i++) {
        if (this.currentUser.roles[i].authority === 'ROLE_ADMIN') {
          this.roleId = 'ROLE_ADMIN'
        }
        if (this.currentUser.roles[i].authority !== 'ROLE_ADMIN') {
          this.roleId = 'ROLE_USER'
        }
      }
    },
    removeValidate1(userId) {
      this.findByIdUser(userId)
      this.errP1 = ''
      this.errorsPass = ''
      this.$router.push(`mark/${userId}`);
    },

    async retrieveUserList() {
      const params = this.getRequestParams(
          this.page,
          this.size
      );
      let response = await userService.getAll(params)
      this.listUser = response.data.content;
      this.count = response.data.totalPages;
    },
    async retrievePointList() {
      await this.getUserListByCateIdAndName()
      const params = this.getRequestParamsYear(
          this.selectedYear
      );
      let response = await userService.getAllByYear(params)
      this.listPoint = response.data;
      for (let i = 0; i < this.listUser.length; i++) {
        for (let j = 0; j < this.listPoint.length; j++) {
          if (this.listUser[i].staffId === this.listPoint[j].staffId) {
            this.listUser[i].password = this.listPoint[j].sum
          }
        }
      }
    },
    findByIdUser: async function (userId) {
      let response = await userService.findById(userId);
      if (response) {
        this.user = response.data
        this.user1 = response.data
        this.curStaffId = this.user1.staffId;
        this.curEmail = this.user1.email;
        this.selected = this.user.department.id
      }
    },

    refreshList() {
      this.retrieveUserList();
      this.currentIndex = -1;
    },

    handlePageChange(value) {

        this.index = (value - 1) * 10

      this.page = value;
      this.retrievePointList()
      this.retrieveUserList();
    },
    getRequestParams(page, size) {
      let params = {};
      if (page) {
        params["p"] = page - 1;
        params["size"] = size
      }
      return params;
    },
    getRequestParamsYear(year) {
      let params = {};
      params["year"] = year;
      return params;
    },
    getDpmParams(CateId) {
      let params = {};
      params["CateId"] = CateId;
      return params;
    },

    router(year, month){
      return this.$router.push(`detail/${year}/${month}`)
    },

    getNameParams(fullName) {
      let params = {};
      if (fullName) {
        params["fullName"] = fullName;
      }
      return params;
    },

    getSearchParams(CateId, fullName){
      let params = {};
      params["CateId"] = CateId;
      params["fullName"] = fullName
      return params;
    },

    async getUserListByCateIdAndName() {
      if (!this.fullName && !this.CateId){
        await this.retrieveUserList()
        const params = this.getRequestParamsYear(
            this.selectedYear
        );
        let response = await userService.getAllByYear(params)
        this.listPoint = response.data;
        for (let i = 0; i < this.listUser.length; i++) {
          for (let j = 0; j < this.listPoint.length; j++) {
            if (this.listUser[i].staffId === this.listPoint[j].staffId) {
              this.listUser[i].password = this.listPoint[j].sum
            }
          }
        }
      } else if (this.fullName && !this.CateId){
        await this.getUserListByName(this.fullName)
        const params = this.getRequestParamsYear(
            this.selectedYear
        );
        let response = await userService.getAllByYear(params)
        this.listPoint = response.data;
        for (let i = 0; i < this.listUser.length; i++) {
          for (let j = 0; j < this.listPoint.length; j++) {
            if (this.listUser[i].staffId === this.listPoint[j].staffId) {
              this.listUser[i].password = this.listPoint[j].sum
            }
          }
        }
      } else if (!this.fullName && this.CateId){
        await this.getUserListByDpm(this.CateId)
        const params = this.getRequestParamsYear(
            this.selectedYear
        );
        let response = await userService.getAllByYear(params)
        this.listPoint = response.data;
        for (let i = 0; i < this.listUser.length; i++) {
          for (let j = 0; j < this.listPoint.length; j++) {
            if (this.listUser[i].staffId === this.listPoint[j].staffId) {
              this.listUser[i].password = this.listPoint[j].sum
            }
          }
        }
      } else {
        let param1 = this.getSearchParams(this.CateId, this.fullName)
        let response = await userService.getUserByCateIdAndName(param1)
        this.listUser = response.data;
        const params = this.getRequestParamsYear(
            this.selectedYear
        );
        let response1 = await userService.getAllByYear(params)
        this.listPoint = response1.data;
        for (let i = 0; i < this.listUser.length; i++) {
          for (let j = 0; j < this.listPoint.length; j++) {
            if (this.listUser[i].staffId === this.listPoint[j].staffId) {
              this.listUser[i].password = this.listPoint[j].sum
            }
          }
        }
      }
    },


    async getUserListByDpm(params) {
      let param1 = this.getDpmParams(params)
      let response = await userService.getUserByCateId(param1)
      this.listUser = response.data;
      this.count = response.data.totalPages;
    },

    async getUserListByName(params) {
      let param1 = this.getNameParams(params)
      let response = await userService.getUserByName(param1)
      this.listUser = response.data;
      this.count = response.data.totalPages;
    },
    toImport() {
      this.$router.push('/admin/import-v-point-from-excel')
    },
    toExport() {
      this.$router.push('/admin/export-v-point-to-excel')
      // Swal.fire({
      //   title: '<strong style="color: #246CD9; font-weight: 700;font-family: Roboto, sans-serif;">Export dữ liệu</strong>',
      //   text: 'Chọn điều kiện xuất',
      //   showDenyButton: true,
      //   showCancelButton: true,
      //   confirmButtonText: 'Tổng điểm',
      //   denyButtonText: 'Chi tiết điểm',
      // }).then((result) => {
      //   /* Read more about isConfirmed, isDenied below */
      //   if (result.isConfirmed) {
      //     Swal.fire('Saved!', '', 'success')
      //   } else if (result.isDenied) {
      //     Swal.fire('Changes are not saved', '', 'info')
      //   }
      // })
    },
    sendMail() {
      let mailDetails = []
      this.listUser.forEach(mark => {
        mailDetails.push({
          staffId: mark.staff_id,
          year: mark.year,
          month: mark.month,
          totalPoint: (mark.pointKPI + mark.pointBestDepartmentMonth + mark.pointBestDepartmentQuarter + mark.pointBestDepartmentYear
              + mark.pointBCSDepartment + mark.pointJointActivities + mark.pointLoveVmg +
              +mark.pointTrain + mark.pointTrainStaff + mark.pointTrainVmg + mark.pointImprove
              + mark.pointDisciplineBonus + mark.pointDisciplineViolate + mark.pointExcellentDepartmentMonth
              + mark.pointExcellentDepartmentMonth + mark.pointExcellentDepartmentYear)
        })
      })
      ExcelService.sendMail(mailDetails).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Gửi mail thành công',
          confirmButtonText: 'Xong!',
        })
      })
    },
  },

  mounted() {
    this.retrieveUserList();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.background {
  background: #FFFFFF;
  padding: 1.5rem;
}

.vpointheader {

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 41px;
  color: #246CD9;
}
</style>
