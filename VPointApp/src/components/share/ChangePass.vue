<template>
  <el-dialog :append-to-body="true" :visible="toggeChangePass" @close="handleChangePass" width="25%" class="text-center">
      <span slot="title" style="width: 214px;
height: 42px;
left: 230px;
top: 100px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 42px;
color: #246CD9;">Đổi mật khẩu</span>
    <el-form :model="changePass" id="changePass" :rules="rules" ref="changePass1">
      <el-form-item  prop="oldPassword"><span slot="label">Nhập mật cũ</span><span slot="label" class="text-danger"> *</span>
        <el-input name="oldPassword" v-model.trim="changePass.oldPassword" type="password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="" prop="newPassword"><span slot="label">Nhập mật khẩu mới</span><span slot="label" class="text-danger"> *</span>
        <el-input name="newPassword" v-model.trim="changePass.newPassword" type="password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="" prop="confirmNewPassword"><span slot="label">Xác nhận mật khẩu mới</span><span slot="label" class="text-danger"> *</span>
        <el-input name="confirmNewPassword" v-model.trim="changePass.confirmNewPassword" type="password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-button type="danger" v-on:click.prevent="RepassUser('changePass1')">Xác nhận</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import authService from "@/service/auth-service";
import swal from "sweetalert2";

export default {
  name: "ChangePass",
  props: {
    toggeChangePass: Boolean
  },
  data() {
    var checkOldPass = (rule, value, callback) => {
      value = String(value);
      setTimeout(() => {
        if (value === '') {
          callback(new Error('Vui lòng nhập mật khẩu cũ'))
        } else if (this.checkOldPass === false) {
          callback( new Error('Mật khẩu cũ không chính xác'))
        } else {
          callback()
        }
      }, 500);
    };

    var checkPass = (rule, value, callback) => {
      value = String(value);
      setTimeout(() => {
        if (value === '') {
          callback(new Error('Vui lòng nhập mật khẩu mới'))
        } else if (!this.validPass(value)) {
          callback('8 ký tự trở lên kết hợp số, chữ hoa và chữ thường')
        } else {
          callback()
        }
      }, 500);
    };
    var checkCfmPass = (rule, value, callback) => {
      value = String(value);
      setTimeout(() => {
        if (value === '') {
          callback(new Error('Vui lòng xác nhận mật khẩu mới'))
        } else if (value !== this.changePass.newPassword) {
          callback('Mật khẩu Không trùng khớp!')
        } else {
          callback()
        }
      }, 500);
    };
    return {
      rules: {
        newPassword: [
          {validator: checkPass, trigger: 'blur'}
        ],
        oldPassword: [
          {validator: checkOldPass, trigger: 'blur'}
        ],
        confirmNewPassword: [
          {validator: checkCfmPass, trigger: 'blur'}
        ],
      },
      dialogFormVisible: true,
      checkOldPass: true,
      changePass: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
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
  methods: {
    validPass: function (pass) {
      var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      return re.test(pass);
    },
    handleChangePass() {
      this.$emit('closeChangePass');
    },
    handleChangePassLayout() {
      this.$emit('closeChangePass')
    },
    RepassUser(changePass) {
      this.checkOldPass = true
      this.$refs[changePass].validate((valid) => {
        if (valid) {
          let form = document.querySelector('#changePass');
          console.log(this.currentUser.id, this.changePass)
          authService.userRepass(this.currentUser.id, this.changePass)
              .then(
                  async data => {
                    this.handleChangePassLayout()
                    form.reset();
                    this.changePass.oldPassword = ''
                    this.changePass.newPassword = ''
                    this.changePass.confirmNewPassword = ''
                    this.a = data.message;
                    this.checkOldPass = true
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
                    this.RepassUser(changePass)
                    this.checkOldPass = false
                  });
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
