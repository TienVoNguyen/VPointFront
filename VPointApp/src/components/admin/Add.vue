<template>
  <el-main>
    <div style="margin: 20px;"></div>
    <p class="text-title">Nhập dữ liệu tính điểm VPoint</p>
    <el-form :label-position="labelPosition" :rules="rules" label-width="100px" :model="mark" ref="mark">
      <el-collapse>
      <el-form-item class="inline profile" >
        <el-row :gutter="20" type="flex" justify="space-around">
          <el-col :span="4">
          <el-form-item class="form-item">
            <span class="text-item">Mã nhân viên</span>
            <el-input v-model="mark.staff_id" readonly></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="form-item">
              <span class="text-item">Tên nhân viên</span>
              <el-input v-model="user.name" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="form-item">
              <span class="text-item">Bộ phận</span>
              <el-input v-model="user.department" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="4" :offset="10">
            <el-form-item class="date-input form-item" prop="date">
              <span class="text-item">Thời gian</span>
              <el-date-picker
                type="month"
                v-model="date"
                @change="handleData"
                :validate-event="true"
                placeholder="Chọn ngày"
                required
                style="width: 100%"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-collapse-item>
      <!-- <el-row> -->
        <el-col slot="title" :offset="2">
          <p class="text-header">Mục I. Hiệu suất công việc</p>
        </el-col>
      <!-- </el-row> -->
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item prop="kpi" >
            <p class="text-content">1. KPI cá nhân</p>
            <el-input placeholder="Nhập KPI(%)" type="number" v-model="mark.kpi" >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-around">
          <el-col >
            <el-row >
              <el-col :offset="4">
                <p class="text-content">2. Nhân viên xuất sắc & Bộ phận xuất sắc</p>
              </el-col>
              <el-col :span="6" :offset="4">
                <el-form-item >
                  <h6>2.1 Nhân viên xuất sắc tháng</h6>
                  <el-checkbox v-model="mark.bestDepartmentMonth" class="checkbox-form"><span class="text-checkbox">Nhân viên xuất sắc tháng</span></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="6">
                <el-form-item >
                  <h6>3.1 Bộ phận xuất sắc tháng</h6>
                  <el-checkbox v-model="mark.excellentDepartmentMonth" class="checkbox-form"><span class="text-checkbox">Bộ phận xuất sắc tháng</span></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col>
            <el-row  >
              <el-col :span="6" :offset="4">
                <el-form-item >
                  <h6>2.2 Nhân viên xuất sắc quý</h6>
                  <el-select v-model="mark.bestDepartmentQuarter" clearable placeholder="Nhân viên xuất sắc" class="select-item">
                  <el-option
                    v-for="item in bestDepartmentMonth"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="6">
                <el-form-item >
                  <h6>3.2 Bộ phận xuất sắc năm</h6>
                  <el-checkbox v-model="mark.excellentDepartmentYear" class="checkbox-form"><span class="text-checkbox">Bộ phận xuất sắc năm</span></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="4">
                <el-form-item >
                  <h6>2.3 Nhân viên xuất sắc năm</h6>
                  <el-select v-model="mark.bestDepartmentYear" clearable placeholder="Nhân viên xuất sắc" class="select-item">
                    <el-option
                      v-for="item in bestDepartmentYear"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>   
            </el-row>
          </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item>
      <!-- <el-row> -->
        <el-col slot="title" :offset="2">
          <p class="text-header">Mục II. Làm việc nhóm</p>
        </el-col>
      <!-- </el-row> -->
      <el-row justify="space-around">
        <el-col>
            <el-row>
              <el-col :span="6" :offset="4">
                <el-form-item prop="bcsDepartment"  >
                  <p class="text-content">3. Điểm BSC bộ phận</p>
                  <el-input placeholder="Nhập điểm BSC bộ phận(%)" type="number" v-model="mark.bcsDepartment"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="6">
                <p class="text-content">4. Hoạt động chung</p>
                <el-form-item prop="jointActivities" >
                  <el-input placeholder="Nhập điểm hoạt động chung" type="number" v-model="mark.jointActivities"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item>
      <!-- <el-row> -->
        <el-col slot="title" :offset="2">
          <p class="text-header">Mục III. Đào tạo và phát triển</p>
        </el-col>
      <!-- </el-row> -->
      <el-row>
        <el-col>
            <el-row >
              <el-col :offset="4">
                <p class="text-content">5. Đào tạo</p>
              </el-col>
              <el-col :span="6" :offset="4">
                <el-form-item prop="train">
                  <h6>5.1. Người đào tạo</h6>
                  <el-input placeholder="Nhập điểm" type="number" v-model="mark.train"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="6">
                <el-form-item prop="trainStaff" >
                  <h6>5.2. Người tham gia đào tạo</h6>
                  <el-input placeholder="Nhập điểm đào tạo(%)" type="number" v-model="mark.trainStaff">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="4">
                <h6>5.3. Chương trình phát triển cùng VMG</h6>
                <el-form-item prop="trainVmg" >
                  <el-input placeholder="Nhập điểm" type="number" v-model="mark.trainVmg"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item>
      <!-- <el-row> -->
        <el-col slot="title" :offset="2">
          <p class="text-header">Mục IV. Sáng tạo</p>
        </el-col>
      <!-- </el-row> -->
      <el-row>
        <el-col>
            <el-row>
              <el-col :offset="4">
                <p class="text-content">6. Cải tiến, đổi mới</p>
              </el-col>
              <el-col :span="6" :offset="4">
                <el-form-item  >
                  <h6>6.1 Cải tiến đổi mới</h6>
                  <el-checkbox v-model="mark.improve"><span class="text-checkbox">Nhân sự có ý tưởng cải tiến đổi mới tháng</span></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="6">
                <el-form-item>
                  <h6>6.2 Điểm cải tiến đổi mới năm</h6>
                  <el-input placeholder="Nhập điểm" type="number" v-model="mark.improveYear"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item>
      <!-- <el-row> -->
        <el-col slot="title" :offset="2">
          <p class="text-header">Mục V. Tuân thủ</p>
        </el-col>
      <!-- </el-row> -->
      <el-row justify="space-around">
        <el-col>
          <el-row >
            <el-col :span="6" :offset="4">
              <el-form-item prop="loveVmg" >
                <p class="text-content">7. Tôi yêu VMG</p>
                <el-input type="number" v-model="mark.loveVmg" placeholder="Nhập điểm test(%)" >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row justify="space-around">
          <el-col>
            <el-row>
              <el-col :offset="4">
                <p class="text-content">8. Kỷ luật</p>
              </el-col>
              <el-col :span="6" :offset="4">
                <el-form-item prop="disciplineViolate" >
                  <h6>8.1. Vi phạm kỷ luật</h6>
                  <el-input type="number" v-model="mark.disciplineViolate" placeholder="Nhập điểm"></el-input>
                </el-form-item>
              </el-col>
            <el-col :span="6" :offset="6">
              <el-form-item prop="disciplineBonus" >
                <h6>8.2. Điểm thưởng</h6>
                <el-input placeholder="Nhập điểm thưởng" type="number" v-model="mark.disciplineBonus"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-collapse-item>
      <el-form-item>
        <el-button class="btn-submit" type="danger" v-on:click.prevent="onSubmit('mark')">Nhập điểm</el-button>
      </el-form-item>
      </el-collapse>
    </el-form>
  </el-main>
</template>
<script>

import markService from "../../service/mark-service";
import  {UserService as userService} from '../../service/user-service';
import swal from 'sweetalert2'

  export default {
    name: 'AddMarkComponent',
    data() {
      // var checkDate = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('Hãy chọn ngày'));
      //   }
      // };
      var checkDisciplineViolate = (rule, value, callback) => {
        value = Number(value);
        setTimeout(() => {
          if (value > 0) {
            callback(new Error('Giá trị phải nhỏ hơn 0'));
          } else {
            callback();
          }
        }, 500);
      };
      var checkLoveVmg = (rule, value, callback) => {
        value = Number(value);
        setTimeout(() => {
          if (value < 0 || value > 100) {
            callback(new Error('Giá trị từ 0 - 100'));
          } else {
            callback();
          }
        }, 500);
      };
      var checkPercent = (rule, value, callback) => {
        value = Number(value);
        setTimeout(() => {
          if (value < 0) {
            callback(new Error('Phải lớn hơn 0'));
          } else {
            callback();
          }
        }, 500);
      };
      var checkJointActivities = (rule, value, callback) => {
        value = Number(value);
        setTimeout(() => {
          if (-0.5 > value || value > 4) {
            callback(new Error('Giá trị phải từ -0.5 đến 4'));
          } else {
            callback();
          }
        }, 500)
      };
      var checkTrainVmg = (rule, value, callback) => {
        value = Number(value);
        setTimeout(() => {
          if( value < 0 || value > 50) {
            callback(new Error('Giá trị phải từ 0 - 50'));
          } else {
            callback();
          }
        }, 500)
      };
      var checkTrain = (rule, value, callback) => {
        value = Number(value);
        setTimeout(() => {
          if( value > 5) {
            callback(new Error('Giá trị không được lớn hơn 5'));
          } else {
            callback();
          }
        }, 500)
      }; 
      return {
        labelPosition: 'top',
        rules: {
          kpi: [
            {validator: checkPercent, trigger: 'blur' }
          ],
          bcsDepartment: [
            {validator: checkPercent, trigger: 'blur' }
          ],
          jointActivities: [
            {validator: checkJointActivities, trigger: 'blur' }
          ],
          trainStaff: [
            {validator: checkPercent, trigger: 'blur' }
          ],
          trainVmg: [
            {validator: checkTrainVmg, trigger: 'blur' }
          ],
          loveVmg: [
            {validator: checkLoveVmg, trigger: 'blur' }
          ],
          disciplineBonus: [
            {validator: checkPercent, trigger: 'blur' }
          ],
          disciplineViolate: [
            {validator: checkDisciplineViolate, trigger: 'blur' }
          ],
          train: [
            {validator: checkTrain, trigger: 'blur' }
          ],
        },
        user: {
          department: '',
          name: '',
          staff_id: '',
          id: ''
        },
        date: null,
        mark: {
          staff_id: '',
          kpiID: 1,
          kpi: null,
          disciplineBonus: null,
          bestDepartmentMonth: false,
          bestDepartmentQuarter: null,
          bestDepartmentYear: null,
          jointActivities: null,
          bcsDepartment: null,
          train: null,
          improve: false,
          loveVmg: null,
          trainStaff: null,
          excellentDepartmentMonth: false,
          excellentDepartmentYear: false,
          trainVmg: null,
          disciplineViolate: null,
          improveYear: null,
          month: null,
          year: null
        },
        bestDepartmentMonth: [
          {
            value: 'DCQ',
            label: 'Đề cử quý'
          },
          {
            value: 'Q',
            label: 'Xuất sắc quý các hạng mục'
          },
          {
            value: 'NSQ',
            label: 'Nhân viên xuất sắc quý'
          }
        ],
        bestDepartmentYear: [
          {
            value: 'DCN',
            label: 'Đề cử năm'
          },
          {
            value: 'N',
            label: 'Xuất sắc năm các hạng mục'
          },
          {
            value: 'NSN',
            label: 'Nhân viên xuất sắc năm'
          }
        ],
      };
    },
    methods: {
      roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
      },
      handleInputParams() {
        this.mark.kpi = this.roundToTwo(this.mark.kpi);
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.date === null) {
              swal.fire({
                    toast: true,
                    title: "Hãy chọn thời gian!",
                    icon: "error",
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  }
                )
                return;
            }
            this.handleInputParams();
            let date = new Date(this.date);
            this.mark.month = date.getMonth() + 1;
            this.mark.year = date.getFullYear();
            this.mark.staff_id = this.user.staff_id;
            markService.create(this.mark)
              .then(result => {
                console.log(result.data);
                swal.fire({
                    toast: true,
                    title: "Xong!",
                    icon: "success",
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  }
                );
                this.$router.push(`/admin/AdminSeeDetailVPoint/${this.mark.year}/${this.mark.month}/${this.user.id}`);
              })
              .catch(error => {
                console.log(error);
                swal.fire({
                    toast: true,
                    title: "Lỗi!",
                    icon: "error",
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  }
                )
              })
          } else {
            return false;
          }
        })
      },
      getUser(id) {
        userService.getUserById(id)
          .then(response => {
            this.user.staff_id = response.data.staff_id;
            this.user.department = response.data.department;
            this.user.name = response.data.name;
            this.mark.staff_id = this.user.staff_id;
          })
          .catch (error => {
            console.log(error);
          })
      },
      handleData(data) {
        data = new Date(data)
        this.mark.month = data.getMonth() + 1;
        this.mark.year = data.getFullYear();
        let dataReq = {
          userId: this.user.id,
          month: this.mark.month,
          year: this.mark.year
        }
        markService.getMarkByUserAndDate(dataReq)
          .then(response => {
            this.mark = response.data;
          })
          .catch (error => {
            console.log(error);
          })
      },
      handleInput() {
      }
    },
    mounted() {
      this.handleData(this.date);
    },
    created() {
      this.date = Date.now();
      this.user.id = this.$route.params.id;
      this.getUser(this.$route.params.id);
    }
  }
</script>
<style scoped>
  p {
    text-align: left;
  }

  .text-header{
    font-family: 'Roboto';
    font-style: normal;
    font-size: 25px;
    line-height: 29px;
    font-weight: 600;
    margin: auto;
    color: #ED1C24;
  }

  .text-content {
    font-family: 'Inter';
    font-style: normal;
    font-size: 23px;
    line-height: 28px;
    color: #000;
    padding-top: 15px;
    font-weight: 550;
  }
  .item-left{
    display: flex;
  }
  .select-item {
    width: 100%;
  }

  .text-title {
    padding-left: 90px;
  }

  .checkbox-form {
    left: -25px;
    color: #000;
  }
  h6 {
    text-align: start;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: #000000;
  }

  .text-title {
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 41px;
    /* identical to box height */


    color: #246CD9;

  }

  .text-item {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: #000000;
  }

  .form-item {
    text-align: left;
  }

  .text-checkbox {
    font-family: 'Inter';
    font-style: normal;
    font-size: 18px;
    line-height: 28px;
    color: #000;
    padding-top: 15px;
    font-weight: 500;
  }
  .btn-submit {
    margin-top: 20px
  }
</style>
