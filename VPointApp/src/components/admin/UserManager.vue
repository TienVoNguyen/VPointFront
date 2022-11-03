<template >
  <el-container>
    <el-header class="mb-5">
      <h3 style="color: #6c757d" align="center">Quản lý người dùng</h3><br>
      <div class="row input-group mb-3">
        <div class="col-6">
          <div class="text-left input-group-prepend">
            <p style="color: #6c757d"> Nhóm:
              <span style="">
                <select class="input-group-text" v-model="CateId" @change="getUser(CateId)"
                        style="width: 300px; display: inherit; align-items: center;">
                  <option value="">Tất cả nhân sự</option>
                  <option v-for="d in departments" v-bind:value="d.id" v-bind:key="d.id">
                    {{ d.name }}
                  </option>
                </select>
              </span>
            </p>
          </div>
        </div>
        <div class="col-6">
          <div class="text-right">
            <p style="color: #6c757d"> Nhập để tìm kiếm:
              <span style="">
                <input style="width: 300px; display: inherit" class="input-group-text" type="text" v-model="fullName"
                       @keyup="get(fullName)">
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="row ">
        <div class="col-6">
          <div class="text-left input-group-prepend">
            <p style="color: #6c757d"> Xem:
              <span style="">
                <select class="input-group-text" v-model="size" @change="retrieveUserList"
                        style="width: 62px; display: inherit; align-items: center;">
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </span> mục
            </p>
          </div>
        </div>
        <div class="col-6">
          <div class="text-right">
            <el-button type="danger" @click="removeValidateCreate(true)" style="width: 35%">Thêm nhân viên mới
            </el-button>
          </div>
        </div>
      </div>
    </el-header>
    <el-main style="margin-top: 5rem">
      <el-table
          border
          :data="listUser"
          style="width: 100%">
        <el-table-column
            align="center"
            prop="staffId"
            label="Mã nhân viên"
            width="120">
        </el-table-column>
        <el-table-column
            align="center"
            prop="fullName"
            label="Họ và tên"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="email"
            label="Email"
            width="250">
        </el-table-column>
        <el-table-column
            align="center"
            prop="department.name"
            label="Phòng ban"
            width="150">
        </el-table-column>
        <el-table-column
            align="center"
            label="Quyền truy cập"
            width="125">
          <template v-slot="scope">
            <span v-for="(role, index) in scope.row.role" :key="index">
              {{ role.name === 'ROLE_ADMIN' ? 'Admin' : 'Người dùng' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
            align="center" class="w-100" style="width: 200px">

          <template v-slot="scope">
            <el-button class="btn btn-warning" type="text" @click="removeValidate(true, scope.row.id)"><i size="default"
                                                                                                          class="el-icon-edit"></i>
            </el-button>
            <el-button class="btn btn-primary" type="text" @click="removeValidate1(true, scope.row.id)"><i
                size="default"
                class="el-icon-key"></i>
            </el-button>
            <el-button class="btn btn-danger" type="text" @click="deleteUser(scope.row.id)"><i size="default"
                                                                                               class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <br>
    <el-footer>
      <el-pagination
          layout="prev, pager, next"
          :page-count="count"
          @current-change="handlePageChange"
          hide-on-single-page>
      </el-pagination>
    </el-footer>

    <!-- change pass -->

    <el-dialog class="text-center" title="Đổi mật khẩu" style="color: #00a2bf" :visible.sync="dialogFormVisible1"
               width="30%">
      <el-form>
        <el-form-item label="Nhập mật khẩu mới">
          <el-input v-model="changePass.newPassword" type="password" autocomplete="off"></el-input>
          <small v-if="errP1 != null" style="color: red">{{ errP1 }}</small>
        </el-form-item>
        <el-form-item label="Xác nhận mật khẩu mới">
          <el-input v-model="changePass.confirmNewPass" type="password" autocomplete="off"></el-input>
          <small v-if="errorsPass != null" style="color: red">{{ errorsPass }}</small>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click.prevent="RepassUser(user.id)">Confirm</el-button>
  </span>
    </el-dialog>

          <el-dialog title="Sửa thông tin" :visible.sync="dialogFormVisible" width="70%" class="text-left">
            <el-form :model="user" id="userForm">
              <div class="row text-start">
                <div class="col-4">
                  <el-form-item prop="staffId">
                    <label for="staffId">Mã nhân sự</label>
                    <el-input name="staffId" v-model="user.staffId" autocomplete="off"></el-input>
                    <small v-if="errId !== null" style="color: red">{{ errId }}</small>
                  </el-form-item>

                </div>
                <div class="col-4">
                  <el-form-item prop="fullname">
                    <label for="fullname">Họ và tên</label>
                    <el-input name="fullname" v-model="user.fullName" autocomplete="off"></el-input>
                    <small v-if="errorsName !== null" style="color: red">{{ errorsName }}</small>
                  </el-form-item>
                </div>
                <div class="col-4 text-start">
                  <el-form-item prop="email">
                    <label for="email">Email đăng nhập</label>
                    <el-input type="email" name="email" v-model="user.email" autocomplete="off"></el-input>
                    <small v-if="errorEmail != null" style="color: red">{{ errorEmail }}</small>
                  </el-form-item>

                </div>
              </div>

              <div class="row">
                <div class="col-4">
                  <el-form-item prop="department">
                    <label for="a">Phòng ban</label> <br>
                    <el-select style="width: 100%" v-model="user.department" value-key="id">
                      <el-option v-for="item in departments"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item"
                      ></el-option>
                    </el-select>
                    <small v-if="errDpm !== null" style="color: red">{{ errDpm }}</small>
                  </el-form-item>
                </div>

          <div class="col-4">
            <el-form-item prop="role">
              <label for="">Quyền truy cập</label>
              <el-select style="width: 100%"  v-model="user.role"  value-key="id">
                <el-option v-for="item in roles"
                           :key="item.id"
                           :label="item.name==='ROLE_ADMIN'?'Admin':'Người dùng'"
                           :value="item"></el-option>
              </el-select>
              <small v-if="errRole !== null" style="color: red">{{errRole}}</small>
            </el-form-item>
          </div>
          <div class="col-4 text-start">
            <el-form-item prop="phone">
              <label for="phone">Số điện thoại</label>
              <el-input type="number" name= "phone" v-model="user.phone" autocomplete="off"></el-input>
                          <small v-if="errPhone != null" style="color: red">{{errPhone}}</small>
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
        <el-button type="primary" @click.prevent="editUser(user.id)">Confirm</el-button>
              <!--      <pre>{{userForm1}}</pre>-->
      </span>

          </el-dialog>

    <el-dialog title="Tạo nhân sự mới" :visible.sync="dialogFormVisible2" width="70%" class="text-left">
      <el-form :model="userForm1" id="userForm">
        <div class="row text-start">
          <div class="col-4">
            <el-form-item prop="fullname">
              <label for="fullname">Họ và tên:</label>
              <el-input name="fullname" v-model="userForm1.fullname" autocomplete="off"></el-input>
              <small v-if="errorsName !== null" style="color: red">{{ errorsName }}</small>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item prop="staffId">
              <label for="staffId">Mã nhân sự:</label>
              <el-input name="staffId" v-model="userForm1.staffId" autocomplete="off"></el-input>
              <small v-if="errId !== null" style="color: red">{{ errId }}</small>
            </el-form-item>

          </div>
          <div class="col-4 text-start">
            <el-form-item prop="email">
              <label for="email">Email đăng nhập:</label>
              <el-input type="email" name="email" v-model="userForm1.email" autocomplete="off"></el-input>
              <small v-if="errorEmail != null" style="color: red">{{ errorEmail }}</small>
            </el-form-item>

          </div>

        </div>

        <div class="row">
          <div class="col-4 text-start">
            <el-form-item prop="gender">
              <label for="gender">Giới tính:</label>
              <br>
              <el-radio v-model="userForm1.gender" label="MALE">Nam</el-radio>
              <el-radio v-model="userForm1.gender" label="FEMALE">Nữ</el-radio>
            </el-form-item>

          </div>
          <div class="col-4">
            <el-form-item prop="department">
              <label for="a">Phòng ban:</label> <br>
              <el-select style="width: 100%" v-model="userForm1.department" value-key="id" placeholder="Vui lòng chọn phòng ban">

                <el-option v-for="item in departments"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
              <small v-if="errDpm !== null" style="color: red">{{ errDpm }}</small>
            </el-form-item>
          </div>
          <div class="col-4">

            <el-form-item prop="phone">
              <label for="phone">Số điện thoại:</label>
              <el-input type="number" name= "phone" v-model="userForm1.phone" autocomplete="off"></el-input>
                            <small v-if="errPhone !== null" style="color: red">{{errPhone}}</small>
            </el-form-item>
          </div>

        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item prop="role">
              <label for="">Quyền truy cập:</label>
              <el-select style="width: 100%" v-model="userForm1.role" placeholder="Chọn quyền truy cập">
                <el-option v-for="item in roles"
                           :key="item.id"
                           :label="item.name==='ROLE_ADMIN'?'Admin':'Người dùng'"
                           :value="item.id"></el-option>
              </el-select>
              <small v-if="errRole !== null" style="color: red">{{ errRole }}</small>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item prop="password">
              <label for="">Nhập mật khẩu:</label>
              <el-input name="password" type="password" v-model="userForm1.password"
                        autocomplete="off"></el-input>
              <small v-if="errP1 != null" style="color: red">{{ errP1 }}</small>
            </el-form-item>
          </div>

          <div class="col-4">
            <el-form-item prop="confirmPassword">
              <label for="">Nhập lại mật khẩu:</label>
              <el-input name="confirmPassword" type="password" v-model="userForm1.confirmPassword"
                        autocomplete="off"></el-input>
              <small v-if="errorsPass !== null" style="color: red">{{ errorsPass }}</small>

            </el-form-item>
          </div>

        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeValidate(false)">Cancel</el-button>
        <el-button type="primary" @click.prevent="handleRegister">Confirm</el-button>
      </span>
    </el-dialog>
  </el-container>


</template>
<script>
import {UserService as userService} from "@/service/user-service";
import swal from 'sweetalert2'
import authService from "@/service/auth-service";

export default {
  name: 'UserManagerComponent',
  data: function () {
    return {
      CateId: '',
      fullName: '',
      userForm1: {
        staffId: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        email: '',
        department: '',
        role: {},
        phone: '',
        gender: ''
      },
      size: 10,
      listUser: [],
      listU: '',
      point: [],
      currentIndex: -1,
      page: 1,
      count: 0,
      itemCount: 6,
      categoryCode: '',
      errorMessage: '',
      curStaffId: '',
      curEmail: '',
      user: '',
      user1: '',
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      message: '',
      roles: [],
      errId: '',
      errP1: '',
      errorsPass: '',
      departments: [],
      errorsName: '',
      matchName: '',
      errorEmail: '',
      errDpm: '',
      errRole: '',
      checkButton: true,
      selected: '',
      check1: true,
      checkId: true,
      checkEmail: true,
      checkName: true,
      checkDpm: true,
      checkRole: true,
      checkPass: true,
      checkPhone: true,
      errPhone: '',
      changePass: {
        newPassword: '',
        confirmNewPass: '',
      },
    }
  },
  async created() {
    await this.retrieveUserList()
    let response = await authService.getAllUser()
    this.listU = response.data;
    let response1 = await authService.getAllRole()
    this.roles = response1.data;
    let response2 = await authService.getAllDepartment()
    this.departments = response2.data;
    console.log(this.roles)
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
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    validPass: function (pass) {
      var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      return re.test(pass);
    },

    validPhone: function (phone) {
      var re = /((0)+([0-9]{9})\b)/g;
      return re.test(phone);
    },

    removeValidate1(check, userId) {
      this.findByIdUser(userId)
      this.dialogFormVisible1 = check
      this.errP1 = ''
      this.errorsPass = ''
    },

    removeValidate(check, userId) {
      this.findByIdUser(userId)
      this.dialogFormVisible = check,
          this.message = '',
          this.errId = '',
          this.errP1 = '',
          this.errorsPass = '',
          this.errorsName = '',
          this.matchName = '',
          this.errorEmail = '',
          this.errDpm = '',
          this.errRole = '',
          this.errPhone = ''
    },

    removeValidateCreate(check) {

      this.dialogFormVisible2 = check,
          this.message = '',
          this.errId = '',
          this.errP1 = '',
          this.errorsPass = '',
          this.errorsName = '',
          this.matchName = '',
          this.errorEmail = '',
          this.errDpm = '',
          this.errRole = '',
          this.errPhone = ''
    },
    async retrieveUserList() {
      // if(this.size > 10){
      //   this.page = 0
      // }
      const params = this.getRequestParams(
          this.page,
          this.size
      );
      console.log(params)
      let response = await userService.getAll(params)
      this.listUser = response.data.content;
      this.count = response.data.totalPages;
      console.log('users')
      console.log(this.listUser)
    },

    async handleRegister() {
      let response = await authService.getAllUser()
      this.listU = response.data;

      for (let i = 0; i < this.listU.length; i++) {
        if (this.userForm1.staffId === this.listU[i].staffId) {
          this.errId = 'Mã nhân sự đã tồn tại'
          this.checkId = false;
          break
        } else {
          this.checkId = true;
        }
      }

      if (!this.userForm1.staffId) {
        this.errId = 'Hãy nhập mã nhân sự'

        this.checkId = false;
      }

      if (this.userForm1.staffId && this.checkId === true) {
        this.errId = ''

      }

      if (!this.userForm1.department) {
        this.checkDpm = false;
        this.errDpm = 'Hãy chọn phòng ban'
      } else {
        this.errDpm = ''
        this.checkDpm = true
      }

      if (this.userForm1.role.length === 0) {
        this.checkRole = false;
        this.errRole = 'Hãy chọn quyền truy cập'
      } else {
        this.checkRole = true;
        this.errRole = ''
      }

      for (let i = 0; i < this.listU.length; i++) {
        if (this.userForm1.email === this.listU[i].email) {
          this.errorEmail = 'Email này đã tồn tại trong hệ thống'
          this.checkEmail = false;
          break
        } else {

          this.checkEmail = true;
        }
      }

      if (!this.userForm1.email) {
        this.errorEmail = 'Vui lòng nhập email nhân viên'

        this.checkEmail = false;
      } else if (!this.validEmail(this.userForm1.email)) {
        this.errorEmail = 'Vui lòng nhập đúng định dạng email'
        this.checkEmail = false;
      } else if (this.validEmail(this.userForm1.email) && this.userForm1.email && this.checkEmail === true) {
        this.errorEmail = ''
        this.checkEmail = true
      }

      if (!this.userForm1.phone) {
        this.errPhone = 'Vui lòng nhập số điện thoại nhân viên'
        this.checkPhone = false;
      } else if (!this.validPhone(this.userForm1.phone)) {
        this.errPhone = 'Số điện thoại không đúng'
        this.checkPhone = false;
      } else if (this.validPhone(this.userForm1.phone) && this.userForm1.phone) {
        this.errPhone = ''
        this.checkPhone = true
      }


      if (!this.userForm1.fullname) {
        this.errorsName = 'Vui lòng nhập tên nhân viên'
        this.check1 = false;
      } else {
        this.errorsName = ''
        this.check1 = true;
      }


      if (this.userForm1.password !== this.userForm1.confirmPassword) {
        this.errorsPass = 'Mật khẩu không trùng khớp'
        this.checkPass = false
      }


      if (!this.userForm1.password && this.userForm1.confirmPassword || !this.userForm1.password && !this.userForm1.confirmPassword) {
        this.errP1 = 'Vui lòng nhập mật khẩu'
        this.checkPass = false;
      } else if (!this.validPass(this.userForm1.password)) {
        this.errP1 = 'Mật khẩu gồm 8 ký tự trở lên có ít nhất một số và một chữ hoa và chữ thường'
        this.checkPass = false;
      } else {
        this.errP1 = ''
        this.checkPass = true;
      }

      if (this.userForm1.password && !this.userForm1.confirmPassword) {
        this.errorsPass = 'Vui lòng xác nhận mật khẩu'
        this.checkPass = false;
      } else if (this.userForm1.password !== this.userForm1.confirmPassword) {
        this.errorsPass = 'Mật khẩu không trùng khớp'
        this.checkPass = false;
      } else if (this.userForm1.password === this.userForm1.confirmPassword && this.validPass(this.userForm1.password)) {
        this.errorsPass = ''
        this.checkPass = true;
      }
      if (this.check1 === true && this.checkId === true && this.checkEmail === true && this.checkDpm === true && this.checkPass === true && this.checkRole === true && this.checkPhone === true) {
        let form = document.querySelector('#userForm');
        let formdata = new FormData(form);
        formdata.append("department.id", this.userForm1.department)
        formdata.append("gender", this.userForm1.gender)
        formdata.append("role", this.userForm1.role)
        console.log(formdata);
        authService.createUser(formdata)
            .then(
                async data => {
                  if (this.listUser.length === 10) {
                    this.page += 1
                  }
                  const params = this.getRequestParams(
                      this.page,
                      this.size
                  );
                  console.log(params)
                  let response = await userService.getAll(params)
                  this.listUser = response.data.content;
                  this.count = response.data.totalPages;
                  this.a = data.message;
                  // let response = authService.getAllUser()
                  // this.user = response.data;
                  this.dialogFormVisible2 = false;
                  this.checkId = false;
                  this.checkEmail = false;
                  swal.fire({
                        toast: true,
                        title: "Xong!",
                        icon: "success",
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                      }
                  )
                }, () => {
                  this.dialogFormVisible2 = true;
                  swal.fire({
                    toast: true,
                    title: "Đã có lỗi xảy ra!",
                    icon: "error",
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });
                });
      } else {
        this.message = 'Vui lòng điền đầy đủ thông tin'
      }
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
    deleteUser: async function (userId) {
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
                    this.page,
                    this.size
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

    RepassUser(userId) {
      if (!this.changePass.newPassword && this.changePass.confirmNewPass || !this.changePass.newPassword && !this.changePass.confirmNewPass) {
        this.errP1 = 'Vui lòng nhập mật khẩu'
        this.check1 = false;
      } else if (!this.validPass(this.changePass.newPassword)) {
        this.errP1 = 'Mật khẩu gồm 8 ký tự trở lên có ít nhất một số và một chữ hoa và chữ thường'
        this.check1 = false;
      } else {
        this.errP1 = ''
        this.check1 = true;
      }

      if (this.changePass.newPassword && !this.changePass.confirmNewPass) {
        this.errorsPass = 'Vui lòng xác nhận mật khẩu'
        this.check1 = false;
      } else if (this.changePass.newPassword !== this.changePass.confirmNewPass) {
        this.errorsPass = 'Mật khẩu không trùng khớp'
        this.check1 = false;
      } else if (this.changePass.newPassword === this.changePass.confirmNewPass && this.validPass(this.changePass.newPassword)) {
        this.errorsPass = ''
        this.check1 = true;
      }

      if (this.check1 === true) {
        authService.adminRepass(userId, this.changePass)
            .then(
                async data => {
                  const params = this.getRequestParams(
                      this.page,
                      this.size
                  );
                  // if (this.listUser.length === 10){
                  //   this.params += 1
                  // }
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
                }, () => {
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

    async editUser(userId) {

      let response = await authService.getAllUser()
      this.listU = response.data;
      if (!this.user.fullName) {
        this.errorsName = 'Vui lòng nhập tên nhân viên'
        this.check1 = false;
      } else {
        this.errorsName = ''
        this.check1 = true;
      }
      for (let i = 0; i < this.listU.length; i++) {
        if (this.user.staffId === this.listU[i].staffId && this.user.staffId !== this.curStaffId) {
          this.errId = 'Mã nhân sự đã tồn tại'
          this.checkId = false;
          break
        } else {
          this.checkId = true;
          this.errId = ''
        }
      }

      if (!this.user.phone) {
        this.errPhone = 'Vui lòng nhập số điện thoại nhân viên'
        this.checkPhone = false;
      } else if (!this.validPhone(this.user.phone)) {
        this.errPhone = 'Số điện thoại không đúng'
        this.checkPhone = false;
      } else if (this.validPhone(this.user.phone) && this.user.phone) {
        this.errPhone = ''
        this.checkPhone = true
      }

      if (!this.user.staffId) {
        this.errId = 'Hãy nhập mã nhân sự'
        this.check1 = false;
        this.checkId = false;
      }
      for (let i = 0; i < this.listU.length; i++) {
        if (this.user.email === this.listU[i].email && this.user.email !== this.curEmail) {
          this.errorEmail = 'Email này đã tồn tại trong hệ thống'
          this.checkEmail = false;
          break
        } else {
          this.checkEmail = true;
        }
      }
      if (!this.user.email) {
        this.errorEmail = 'Vui lòng nhập email nhân viên'
        this.checkEmail = false;
      } else if (!this.validEmail(this.user.email)) {
        this.errorEmail = 'Vui lòng nhập đúng định dạng email'
        this.checkEmail = false;
      } else if (this.validEmail(this.user.email) && this.user.email && this.checkEmail === true) {
        this.errorEmail = ''
        this.checkEmail = true;
      }
      if (!this.user.department) {
        this.checkDpm = false;
        this.errDpm = 'Hãy chọn phòng ban'
      } else {
        this.errDpm = ''
        this.checkDpm = true;
      }
      if (this.user.role.length === 0) {
        this.checkDpm = false;
        this.errRole = 'Hãy chọn quyền truy cập'
      } else if (this.user.role.length > 1) {
        this.checkDpm = false;
        this.errRole = 'Chỉ chọn 1 quyền truy cập'
      } else {
        this.errRole = ''
        this.checkDpm = true;
      }
      if (this.check1 === true && this.checkId === true && this.checkEmail === true && this.checkRole === true && this.checkDpm === true && this.checkPhone === true) {
        let form = document.querySelector('#userForm');
        let formdata = new FormData(form);
        formdata.append("department.id", this.user.department.id)
        let roles = [];
        this.user.role.forEach(r => {
          roles.push(r.id)
        })
        console.log(roles)
        formdata.append("role", roles)
        authService.editUser(userId, formdata)
            .then(
                async data => {
                  const params = this.getRequestParams(
                      this.page,
                      this.size
                  );
                  console.log(params)
                  let response = await authService.getUserPage(params)
                  console.log(response)
                  this.listUser = response.data.content
                  this.count = response.data.totalPages;
                  this.a = data.message,
                      this.dialogFormVisible = false;
                  await swal.fire({
                    toast: true,
                    title: "Xong!",
                    icon: "success",
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  })
                }, () => {
                  this.dialogFormVisible = true;
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
    getDpmParams(CateId) {
      let params = {};

      params["CateId"] = CateId;

      return params;
    },

    getUser(params) {
      console.log(params)
      if (params === '') {
        this.retrieveUserList()
      } else {
        this.getUserListByDpm(params)
      }
    },

    getNameParams(fullName) {
      let params = {};
      if (fullName) {
        params["fullName"] = fullName;
      }
      return params;
    },

    get(params) {
      if (this.fullName === '') {
        this.retrieveUserList()
      } else {
        this.getUserListByName(params)
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
</style>
