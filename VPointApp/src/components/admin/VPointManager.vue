<template>
  <el-container class="background">
    <div class="text-center">
      <h2 class="vpointheader">Quản lý điểm V-Point</h2>
      <h4 style="color: #6c757d; margin-bottom: 2rem"> Chọn năm: <span >
        <select class="form-control" v-model="selectedYear" @change="retrievePointList" style="width: 200px; display: inherit; align-items: center" >
          <option v-for="y in year" v-bind:value="y"  v-bind:key ="y" >
            {{ y }}
          </option>
        </select>
      </span>
      </h4>
    </div>

    <el-table border align="center"
              :data="listUser"
              style="width: 100%">
      <el-table-column align="center"
                       prop="staffId"
                       label="Mã nhân viên"
                       width="200">
      </el-table-column>
      <el-table-column align="center"
                       prop="fullName"
                       label="Họ và tên"
                       width="350">
      </el-table-column>
      <el-table-column
          align="center"
          prop="department.name"
          label="Phòng ban"
          width="250">
      </el-table-column>

      <el-table-column
          vertical-align="middle"
          align="center"
          width="150"
          label="V-point">
        <template v-slot="scope">
          <p height="50px"><br>
            {{scope.row.password.length > 10? 0: scope.row.password}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
          label="Tùy chọn">
        <template v-slot="scope">
          <el-button class="btn btn-success" type="text" @click="removeValidate1(scope.row.id)"><i size="default" class="el-icon-plus"></i></el-button>
          <el-button class="btn btn-warning" type="text"><router-link :to="`detail/${scope.row.id}/${selectedYear}`" style="color: white"><i size="default" class="el-icon-view"></i></router-link></el-button>

          <el-button class="btn btn-danger" type="text" @click="deleteUser(scope.row.id)"><i size="default" class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>

    </el-table>


    <el-footer>
      <el-pagination
          layout="prev, pager, next"
          :page-count="count"
          @current-change="handlePageChange"
          hide-on-single-page>
      </el-pagination>
    </el-footer>


    <!--     //change pass -->

    <el-dialog title="Đổi mật khẩu" :visible.sync="dialogFormVisible1">
      <el-form>
        <el-form-item label="Nhập mật khẩu mới">
          <el-input v-model="changePass.newPassword" autocomplete="off"></el-input>
          <small v-if="errP1 != null" style="color: red">{{errP1}}</small>
        </el-form-item>
        <el-form-item label="Xác nhận mật khẩu mới">
          <el-input v-model="changePass.confirmNewPass" autocomplete="off"></el-input>
          <small v-if="errorsPass != null" style="color: red">{{errorsPass}}</small>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click.prevent="RepassUser(user.id)">Confirm</el-button>
        <!--        <pre>{{changePass}}</pre>-->
  </span>
    </el-dialog>


    <el-dialog  title="Sửa thông tin" :visible.sync="dialogFormVisible" width="70%">
      <el-form :model="user" id="userForm" >
        <div class="row text-start" >
          <div class="col-6">
            <el-form-item prop="fullname">
              <label for="fullname">Họ và tên</label>
              <el-input name= "fullname" v-model="user.fullName" autocomplete="off"></el-input>
              <small v-if="errorsName !== null" style="color: red">{{errorsName}}</small>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item prop="staffId">
              <label for="staffId">Mã nhân sự</label>
              <el-input name= "staffId" v-model="user.staffId" autocomplete="off"></el-input>
              <small v-if="errId !== null" style="color: red">{{errId}}</small>
            </el-form-item>

          </div>
          <div class="col-3">
            <el-form-item   prop="department">
              <label for="a">Phòng ban</label> <br>
              <el-select style="width: 100%" v-model="user.department" value-key="id">
                <el-option   v-for="item in departments"
                             :key="item.id"
                             :label="item.name"
                             :value="item"
                ></el-option>
              </el-select>
              <small v-if="errDpm !== null" style="color: red">{{errDpm}}</small>
            </el-form-item>
          </div>
        </div>

        <div class="row">

          <div class="col-6 text-start">
            <el-form-item prop="email">
              <label for="email">Email đăng nhập</label>
              <el-input type="email" name= "email" v-model="user.email" autocomplete="off"></el-input>
              <small v-if="errorEmail != null" style="color: red">{{errorEmail}}</small>
            </el-form-item>

          </div>
          <div class="col-6">
            <el-form-item prop="role">
              <label for="">Quyền truy cập</label>
              <el-select style="width: 100%" v-model="user.role" multiple value-key="id">
                <el-option v-for="item in roles"
                           :key="item.id"
                           :label="item.name==='ROLE_ADMIN'?'Admin':'Người dùng'"
                           :value="item"></el-option>
              </el-select>
              <small v-if="errRole !== null" style="color: red">{{errRole}}</small>
            </el-form-item>
          </div>
        </div>

        <div style="display: none">
          <div class="col-3">
            <el-form-item prop="password" >
              <label for="">Nhập mật khẩu</label>
              <el-input name= "password" type="password" v-model="user.password" autocomplete="off"></el-input>
              <small v-if="errP1 != null" style="color: red">{{errP1}}</small>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item  prop="confirmPassword">
              <label for="">Nhập lại mật khẩu</label>
              <el-input name= "confirmPassword" type="password" v-model="user.password" autocomplete="off"></el-input>
              <small v-if="errorsPass !== null" style="color: red">{{errorsPass}}</small>
            </el-form-item>

          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="removeValidate(false)">Cancel</el-button>-->
    <el-button type="primary"  @click.prevent="editUser(user.id)">Confirm</el-button>
        <!--      <pre>{{userForm1}}</pre>-->
  </span>
    </el-dialog>
  </el-container>

</template>
<script>
import  {UserService as userService} from "@/service/user-service";
import swal from 'sweetalert2'
import login from "@/components/auth/Login";
import authService from "@/service/auth-service";
import moment from "moment";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'HomeComponent',
  data : function() {
    return {
      pointU:'',
      year: [],
      selectedYear: this.formatYear(new Date()),
      listPoint: [],
      listUser: [],
      listU: '',
      point: [],
      currentIndex: -1,
      page: 1,
      count: 0,
      categoryCode: '',
      errorMessage: '',
      user: '',
      user1: '',
      dialogFormVisible1: false,
      dialogTableVisible1: false,
      message: '',
      roleId: '',
      roles: [],
      errId: '',
      errP1: '',
      errorsPass: '',
      departments: [],
      checkButton: true,
      selected: '',
      check1: true,

      changePass: {
        newPassword: '',
        confirmNewPass: '',
      },
    }
  },
  async created() {
    this.getRoleId()
    console.log(this.roleId)
    console.log(this.selectedYear, "a")
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
  components: login,
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    formatYear(value){
      if (value) {
        return moment(String(value)).format('YYYY')
      }
    },
    getRoleId() {
      for (let i = 0; i < this.currentUser.roles.length; i++) {
        if (this.currentUser.roles[i].authority === 'ROLE_ADMIN') {
          this.roleId = 'ROLE_ADMIN'
        }
        if( this.currentUser.roles[i].authority !== 'ROLE_ADMIN') {
          this.roleId = 'ROLE_USER'
        }
      }
    },

    validPass: function (pass) {
      var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      return re.test(pass);
    },

    removeValidate1(userId) {
      this.findByIdUser(userId)
      // this.dialogFormVisible1 = check
      this.errP1 = ''
      this.errorsPass = ''
      this.$router.push(`mark/${userId}`);
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async retrieveUserList() {
      const params = this.getRequestParams(
          this.page
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
          if (this.listUser[i].staffId === this.listPoint[j].staffId){
            this.listUser[i].password = this.listPoint[j].sum
          }
        }
      }
      // this.listUser.forEach(user => {
      //   this.listPoint.forEach(upoint => {
      //     if(user.staffId === upoint.staffId) {
      //       user.password = upoint.sum
      //     }else {
      //       user.password = 0
      //     }
      //   })
      // })
      console.log(this.listPoint)

    },
    findByIdUser : async function (userId) {
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
    deleteUser : async function (userId){
      swal.fire({
        title: 'Bạn có chắc muốn xóa người này?',
        text: 'Thao tác này không thể hoàn tác lại!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d63049',
        cancelButtonColor: '#33dd91',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Quay lại',
      }).then(async (result) => {
            if (result.isConfirmed) {
              let response = await userService.deleteUser(userId);
              if (response) {
                const params = this.getRequestParams(
                    this.page
                );
                console.log(params)
                let response = await userService.getAll(params)
                this.listUser = response.data.content
                this.count = response.data.totalPages;
              }
              await swal.fire(
                  'Đã xóa',
                  '',
                  'success'
              );
            }
          }
      );
    },

    RepassUser(userId){
      if (!this.changePass.newPassword && this.changePass.confirmNewPass || !this.changePass.newPassword && !this.changePass.confirmNewPass){
        this.errP1 = 'Vui lòng nhập mật khẩu'
        this.check1 = false;
      } else if (!this.validPass(this.changePass.newPassword)) {
        this.errP1 = 'Mật khẩu gồm 8 ký tự trở lên có ít nhất một số và một chữ hoa và chữ thường'
      } else {
        this.errP1 = ''
        this.check1 = true;
      }

      if (this.changePass.newPassword && !this.changePass.confirmNewPass){
        this.errorsPass = 'Vui lòng xác nhận mật khẩu'
        this.check1 = false;
      } else if (this.changePass.newPassword !== this.changePass.confirmNewPass){
        this.errorsPass = 'Mật khẩu không trùng khớp'
        this.check1 = false;
      } else if (this.changePass.newPassword === this.changePass.confirmNewPass){
        this.errorsPass = ''
        this.check1 = true;
      }

      if (this.check1 === true){
        authService.adminRepass(userId, this.changePass)
            .then(
                async data => {
                  const params = this.getRequestParams(
                      this.page
                  );
                  console.log(params)
                  let response = await authService.getUserPage(params)
                  console.log(response)
                  this.listUser = response.data.content
                  this.count = response.data.totalPages;
                  this.a = data.message,
                      this.dialogFormVisible1 = false;
                  await swal.fire({
                        toast: true,
                        title: "Xong!",
                        icon: "success",
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                      }
                  )
                },  () => {
                  this.dialogFormVisible1 = true;
                  swal.fire({
                    toast: true,
                    title: "Đã có lỗi xảy ra!",
                    icon: "error",
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });
                });
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
    getRequestParams(page) {
      let params = {};
      if (page) {
        params["p"] = page - 1;
      }
      return params;
    },
    getRequestParamsYear(year) {
      let params = {};
        params["year"] = year;
      return params;
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.background {
  background: #FFFFFF;
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
