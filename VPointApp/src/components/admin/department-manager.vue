<template>
  <el-container align="center">

    <el-header style="height: auto">
      <h3 style="
      align-content: center;
      height: 41px;
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 35px;
      line-height: 41px;
      margin-top: 2rem;
color: #246CD9;">Quản lý phòng ban</h3>
      <div class="row justify-content-center mb-3">
        <div class="text-right col-lg-4">
          <input placeholder="Nhập tên phòng ban" style="width: 400px; margin-left: auto; margin-right: auto; display: inherit" class="input-group-text text-left" type="text" v-model="nameDpm"
                 @keyup="getUserListByCateIdAndName">
        </div>
      </div>

            <el-button @click="removeValidateCreate(true)" style="width: 250px; margin-left: 60%; background-color: #DC143C; color: white">
              Thêm mới phòng ban
            </el-button>


    </el-header>
    <el-main align="center">
      <el-table
          header-row-style="text-align: center;"
          border
          :data="departments"
          style="width: 80%; margin-right: auto; margin-left: auto"
      >
        <el-table-column
            type="index"
            align="center"
            label="STT"
            width="100">
<!--          <template v-slot="scope">-->
<!--            <span>{{scope.$index + 1}}</span>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column
            prop="name"
            label="Tên phòng ban"
            width="300">
        </el-table-column>
        <el-table-column
            align="center"
            prop="createDate"
            label="Ngày tạo"
            width="200">
        </el-table-column>
        <el-table-column
            align="center"
            label="Số lượng nhân sự"
            width="250">
          <template v-slot="scope">
            {{scope.row.createBy.length > 4? 0: scope.row.createBy}}
          </template>
        </el-table-column>
        <el-table-column
            align="center" class="w-100" style="width: 200px"
            label="Tùy chọn">
          <template v-slot="scope">
            <el-tooltip class="item" effect="dark" content="Sửa thông tin" placement="top">
              <el-button class="btn btn-warning" type="text" @click="findByIdDpm( scope.row.id)" ><i size="default"
                                                                                                             class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
          layout="prev, pager, next"
          :page-count="count"
          @current-change="handlePageChange"
          hide-on-single-page>
      </el-pagination>
    </el-footer>


    <el-dialog :visible.sync="dialogFormVisible1"
               width="30%"><span slot="title" style="width: 214px;
height: 42px;
left: 230px;
top: 100px;

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 42px;

color: #246CD9;">Sửa tên</span >
      <el-form style="padding: 30px" :model="department" id="department" :rules="rulesEdit" ref="department">
        <el-form-item label="" prop="name"><span slot="label">Tên phòng ban</span><span slot="label" class="text-danger"> *</span>
          <el-input v-model="department.name" type="text" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="row justify-content-center">
        <el-button type="danger" @click.prevent="editDpm('department', department.id)">Xác nhận</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible"
               width="30%"><span slot="title" style="width: 214px;
height: 42px;
left: 230px;
top: 100px;

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 42px;
color: #246CD9;">Thêm mới phòng ban</span >
      <el-form style="padding: 30px" :model="department1" id="department1" :rules="rules" ref="department1">
        <el-form-item label="" prop="name"><span slot="label">Tên phòng ban</span><span slot="label" class="text-danger"> *</span>
          <el-input v-model="department1.name" type="text" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="row justify-content-center">
        <el-button type="danger" @click.prevent="createDpm('department1')">Thêm mới</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
import {UserService as userService} from "@/service/user-service";
import authService from "@/service/auth-service";
import swal from "sweetalert2";

export default {
  name: "department-manager",
  data (){
    var checkDpmNameEdit = (rule, value, callback) => {
      value = String(value);
      setTimeout( () => {
        for (let i = 0; i < this.dpm.length; i++) {
          if (value.trim().toLowerCase() === this.dpm[i].name.toLowerCase() && value.trim().toLowerCase() !== this.oldDpmName.toLowerCase()) {
            this.checkDpm = false;
            break
          } else {
            this.checkDpm = true;
          }
        }

        if(value.trim() === ''){
          callback(new Error('Vui lòng nhập tên phòng ban'))
        } else if (this.checkDpm === false ) {
          callback(new Error('Tên phòng ban này đã tồn tại trong hệ thống'))
        } else {
          callback()
        }
      }, 500);
    };
    var checkDpmName = (rule, value, callback) => {
      value = String(value);
      setTimeout( () => {
        for (let i = 0; i < this.dpm.length; i++) {
          if (value.trim().toLowerCase() === this.dpm[i].name.toLowerCase()) {
            this.checkDpm = false;
            break
          } else {
            this.checkDpm = true;
          }
        }

        if(value.trim() === ''){
          callback(new Error('Vui lòng nhập tên phòng ban'))
        } else if (this.checkDpm === false ) {
          callback(new Error('Tên phòng ban này đã tồn tại trong hệ thống'))
        } else {
          callback()
        }
      }, 500);
    };
    return{
      rulesEdit: {
        name: [
          {validator: checkDpmNameEdit, trigger: 'blur' }
        ]
      },
      rules: {
        name: [
          {validator: checkDpmName, trigger: 'blur' }
        ]
      },
      nameDpm: '',
      department1: {
        name: ''
      },
      x: 0,
      department: '',
      departments: [],
      oldDpmName: '',
      dpm: [],
      size: 10,
      currentIndex: -1,
      dialogFormVisible1: false,
      dialogFormVisible: false,
      page: 1,
      count: 0,
      itemCount: 6,
      checkDpm : true
    }
  },
  async created(){
    await this.retrievePointList()
    let response2 = await authService.getAllDepartment()
    this.dpm = response2.data;
    console.log(this.dpm)
  },
  methods: {
    // indexMethod(index, value) {
    //   if (this.page === 1){
    //     return 1 + index
    //   }
    //   return index + 1;
    // },
    removeValidateCreate(check) {
      this.dialogFormVisible = check
    },
    findByIdDpm: async function (dpmId) {
      this.dialogFormVisible1 = true
      let response = await authService.findDpm(dpmId);
      if (response) {
        this.department = response.data
        this.oldDpmName = this.department.name
      }
    },
    async retrieveUserList() {
      const params = this.getRequestParams(
          this.page,
          this.size
      );
      let response = await userService.getAllDpm(params)
      this.departments = response.data.content;
      this.count = response.data.totalPages;
    },

    async createDpm(dpmForm1){
      this.$refs[dpmForm1].validate((valid) =>{
        if (valid){
          authService.createDpm(this.department1)
              .then(
                  async data => {
                    await this.retrievePointList()
                    this.a = data.message,
                    this.department1.name  = '';
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
      })
    },

    async editDpm(dpmForm, dpmId){
      this.$refs[dpmForm].validate((valid) =>{
        if (valid){
          authService.editDpm(dpmId, this.department)
              .then(
                  async data => {
                    await this.retrievePointList()
                    this.a = data.message,
                        this.dialogFormVisible1 = false;
                        await swal.fire({
                          toast: true,
                          title: "Xong!",
                          icon: "success",
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000
                        })
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
      })
    },

    getNameParams(fullName) {
      let params = {};
      if (fullName) {
        params["fullName"] = fullName;
      }
      return params;
    },

    async getUserListByName(params) {
      let param1 = this.getNameParams(params)
      let response1 = await userService.getDpmByName(param1)
      this.departments = response1.data;
      let response = await userService.getAllQuantity()
      this.listQuantity = response.data;
      for (let i = 0; i < this.departments.length; i++) {
        for (let j = 0; j < this.listQuantity.length; j++) {
          if (this.departments[i].id === this.listQuantity[j].id) {
            this.departments[i].createBy
                = this.listQuantity[j].quantity
          }
        }
      }
      this.count = response.data.totalPages;
    },

    async getUserListByCateIdAndName(){
      if (this.nameDpm === ''){
        await this.retrievePointList()
      } else {
        await this.getUserListByName(this.nameDpm)
      }
    },

    async retrievePointList() {
      await this.retrieveUserList()
      let response = await userService.getAllQuantity()
      this.listQuantity = response.data;
      for (let i = 0; i < this.departments.length; i++) {
        for (let j = 0; j < this.listQuantity.length; j++) {
          if (this.departments[i].id === this.listQuantity[j].id) {
            this.departments[i].createBy
                = this.listQuantity[j].quantity
          }
        }
      }
      console.log(this.departments)
    },

    refreshList() {
      this.retrievePointList();
      this.currentIndex = -1;
    },
    mounted() {
      this.retrievePointList();
    },
    handlePageChange(value) {
      // if (this.page > value){
      //   this.indexMethod(-(this.page - value)*10)
      // }
      // if (this.page < value){
      //   this.indexMethod((value - this.page)*10)
      // }
      this.page = value;
      this.retrievePointList();
    },
    getRequestParams(page, size) {
      let params = {};
      if (page) {
        params["p"] = page - 1;
        params["size"] = size
      }
      return params;
    },
  }
}
</script>

<style scoped>

</style>