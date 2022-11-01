<template>
  <el-container class="background">
    <div class="text-center">
      <h2 class="vpointheader">Quản lý điểm V-Point</h2>
      <div class="d-flex justify-content-center mb-4">
        <input placeholder="Nhập để tìm kiếm" style="width: 300px; display: block" class="input-group-text" type="text"
               v-model="fullName"
               @keyup="get(fullName)">
      </div>

      <div class="row input-group mb-3 justify-content-md-center">
        <div class="col-lg-6">
          <div class="text-left input-group-prepend d-inline-block">
            <p style="color: #6c757d"> Nhóm: <span style="">
        <select class="form-control" v-model="CateId" @change="getUser(CateId)"
                style="width: 150px; display: inherit; align-items: center;">
          <option v-bind:value="''">Tất cả</option>
          <option v-for="d in departments" v-bind:value="d.id" v-bind:key="d.id">

            {{ d.name }}
          </option>
        </select>
      </span>
            </p>
          </div>
          <p class="d-inline-block ml-4" style="color: #6c757d; margin-bottom: 2rem"> Năm: <span>
        <select class="form-control" v-model="selectedYear" @change="retrievePointList"
                style="width: 120px; display: inherit; align-items: center">
          <option v-for="y in year" v-bind:value="y" v-bind:key="y">

            {{ y }}
          </option>
        </select>
      </span></p>

        </div>
        <div class="col-2"></div>

      </div>
    </div>
    <div class="row">
      <div class=" col-lg-4 text-left input-group-prepend">
        <p style="color: #6c757d"> Xem: <span style="">
        <select class="input-group-text" v-model="size" @change="retrievePointList"
                style="width: 62px; display: inherit; align-items: center;">

          <option v-bind:value="10">10</option>
          <option v-bind:value="15">15</option>
          <option v-bind:value="20">20</option>
          <option v-bind:value="30">30</option>
        </select>
      </span> mục
        </p>
      </div>
      <div class="col-lg-8 d-flex justify-content-end" >
        <el-button style="border: solid 1px; height: 50%; display: flex; align-items: center"><i class="el-icon-upload2"></i>Import</el-button>
        <el-button style="border: solid 1px; height: 50%; display: flex; align-items: center"> <i class="el-icon-download"></i>Export</el-button>
      </div>

    </div>
    <el-table border
              :data="listUser"
              style="width: 100%">
      <el-table-column align="center"
                       prop="staffId"
                       label="Mã nhân viên"
                       width="150">
      </el-table-column>
      <el-table-column align="center"
                       prop="fullName"
                       label="Họ và tên"
                       width="280">
      </el-table-column>
      <el-table-column
          align="center"
          prop="department.name"
          label="Phòng ban"
          width="280">
      </el-table-column>

      <el-table-column
          vertical-align="middle"
          align="center"
          width="120"
          label="V-point">
        <template v-slot="scope">
          <p><br>
            {{ scope.row.password.length > 10 ? 0 : scope.row.password }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Tùy chọn">
        <template v-slot="scope">
          <el-button class="btn btn-success" type="text" @click="removeValidate1(scope.row.id)">
            <i size="default" class="el-icon-plus"></i>
          </el-button>
          <router-link :to="`detail/${scope.row.id}/${selectedYear}`" style="color: white">
            <el-button class="btn btn-warning m-2" type="text">
              <i size="default" class="el-icon-view"></i>
            </el-button>
          </router-link>

        </template>
      </el-table-column>

    </el-table>


    <el-footer class="text-right">
      <el-pagination
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

export default {
  name: 'HomeComponent',
  data: function () {
    return {
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
    console.log(this.roles)
    console.log(this.departments)
    console.log(this.currentUser)
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
      // this.dialogFormVisible1 = check
      this.errP1 = ''
      this.errorsPass = ''
      this.$router.push(`mark/${userId}`);
    },

    async retrieveUserList() {
      const params = this.getRequestParams(
          this.page,
          this.size
      );
      console.log(params)
      let response = await userService.getAll(params)
      this.listUser = response.data.content;
      this.count = response.data.totalPages;
      console.log(this.count)
      console.log(this.listUser)
    },
    async retrievePointList() {
      await this.retrieveUserList()
      const params = this.getRequestParamsYear(
          this.selectedYear
      );
      console.log(params)
      let response = await userService.getAllByYear(params)
      this.listPoint = response.data;
      for (let i = 0; i < this.listUser.length; i++) {
        for (let j = 0; j < this.listPoint.length; j++) {
          if (this.listUser[i].staffId === this.listPoint[j].staffId) {
            this.listUser[i].password = this.listPoint[j].sum
          }
        }
      }
      console.log(this.listPoint)

    },
    findByIdUser: async function (userId) {
      let response = await userService.findById(userId);
      if (response) {
        this.user = response.data
        console.log(this.user)
        console.log(this.UserId)
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
    mounted() {
      this.retrieveUserList();
    },
    handlePageChange(value) {
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
    async getUser(params1) {
      if (params1 === '') {
        await this.retrievePointList()
      } else {
        await this.getUserListByDpm(params1)
        const params = this.getRequestParamsYear(
            this.selectedYear
        );
        console.log(params)
        let response = await userService.getAllByYear(params)
        this.listPoint = response.data;
        for (let i = 0; i < this.listUser.length; i++) {
          for (let j = 0; j < this.listPoint.length; j++) {
            if (this.listUser[i].staffId === this.listPoint[j].staffId) {
              this.listUser[i].password = this.listPoint[j].sum
            }
          }
        }
      }
    },

    getNameParams(fullName) {
      let params = {};
      if (fullName) {
        params["fullName"] = fullName;
      }
      return params;
    },

    async get(params1) {
      if (this.fullName === '') {
        await this.retrieveUserList()
      } else {
        await this.getUserListByName(params1)
        const params = this.getRequestParamsYear(
            this.selectedYear
        );
        console.log(params)
        let response = await userService.getAllByYear(params)
        this.listPoint = response.data;
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
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 41px;
  color: #246CD9;
}
</style>
