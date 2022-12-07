<template>
<div>
  <div >
    <h4 style="

    align-items: center;
    margin-right: auto;
/*width: 421px;*/
height: 41px;
/*left: 664px;*/
/*top: 123px;*/

font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 35px;
line-height: 41px;


color: #246CD9;"> Quy chế tính điểm  V-Point</h4>
  </div>
  <el-tabs type="border-card" tab-position="top" stretch="true" v-model="activeName" @tab-click="handleClick" style="width: 80%; margin-right: auto; margin-left: auto">
    <el-tab-pane label="User" name="first">
      <span style="font-weight: 700; font-size: medium"  slot="label" >1. Hiệu suất công việc</span>
      <table class="table table-bordered justify-content-center">
        <tr style="background-color: rgba(156, 151, 151, 0.15)">
          <th>Tên hạng mục</th>
          <th>Chi tiết</th>
          <th>Điểm V-point</th>
          <th>Thao tác</th>
        </tr>
        <tr>
          <th rowspan="5 " class="vertical-center text-left">1. KPI cá nhân hàng tháng</th>
          <td class="text-left">1.1. Từ 130% trở lên</td>
          <td>35</td>
          <td rowspan="5" style="font-weight: 700; color: #ED1C24" class="vertical-center">Chỉnh sửa</td>
        </tr>
        <tr>
          <td class="text-left">1.2. Từ trên 95% đến dưới 130%</td>
          <td>1 điểm/ 1%</td>
        </tr>
        <tr>
          <td class="text-left">1.3. 95%</td>
          <td>0</td>
        </tr>
        <tr>
          <td class="text-left">1.4. Từ 70% đến dưới 95%</td>
          <td>-1 điểm/1%</td>
        </tr>
        <tr>
          <td class="text-left">1.5. Dưới 70%</td>
          <td>-25</td>
        </tr>
        <tr>
          <th rowspan="9 " class="vertical-center1 text-left">2. Nhân viên xuất sắc, Bộ phận xuất sắc</th>
          <td class="text-left">2.1. Nhân viên xuất sắc tháng</td>
          <td>10</td>
          <td rowspan="9" style="font-weight: 700; color: #ED1C24" class="vertical-center1">Chỉnh sửa</td>
        </tr>
        <tr>
          <td class="text-left">2.2. Nhân viên được đề cử giải NVXS quý</td>
          <td>10</td>
        </tr>
        <tr>
          <td class="text-left">2.3. Nhân viên xuất sắc quý các hạng mục</td>
          <td>20</td>
        </tr>
        <tr>
          <td class="text-left">2.4. Nhân viên xuất sắc quý</td>
          <td>20</td>
        </tr>
        <tr>
          <td class="text-left">2.5.Nhân viên được đề cử giải Ngôi sao năm</td>
          <td>50</td>
        </tr>
        <tr>
          <td class="text-left">2.6. Ngôi sao năm của các hạng mục</td>
          <td>30</td>
        </tr>
        <tr>
          <td class="text-left">2.7. Ngôi sao năm của công ty</td>
          <td>60</td>
        </tr>
        <tr>
          <td class="text-left">2.8. Bộ phận xuất sắc tháng</td>
          <td>20</td>
        </tr>
        <tr>
          <td class="text-left">2.9. Bộ phận xuất sắc năm</td>
          <td>30</td>
        </tr>
      </table>

    </el-tab-pane>
    <el-tab-pane label="dsfdf" name="second">
      <span style="font-weight: 700; font-size: medium"  slot="label" >2. Làm việc nhóm</span>
      <table class="table table-bordered justify-content-center">
        <tr style="background-color: rgba(156, 151, 151, 0.15)">
          <th>Tên hạng mục</th>
          <th>Chi tiết</th>
          <th>Điểm V-point</th>
          <th>Thao tác</th>
        </tr>
        <tr>
          <th rowspan="4" class=" text-left" style="line-height: 160px;">3. Điểm BSC bộ phận</th>
          <td class="text-left">3.1. Từ 110% trở lên</td>
          <td>10</td>
          <td rowspan="4" style="font-weight: 700; color: #ED1C24; line-height: 160px" >Chỉnh sửa</td>
        </tr>
        <tr>
          <td class="text-left">3.2. Từ trên 105% đến dưới 110%</td>
          <td>1 điểm/ 1%</td>
        </tr>
        <tr>
          <td class="text-left">3.3. Từ 100% đến dưới 105%</td>
          <td>2</td>
        </tr>
        <tr>
          <td class="text-left">3.4. Dưới 100%</td>
          <td>0</td>
        </tr>
        <tr>
          <th rowspan="7" class=" text-left" style="line-height: 280px;">4. Hoạt động chung</th>
          <td class="text-left">4.1. Tham gia với vai trò Ban tổ chức</td>
          <td>1-4</td>
        </tr>
        <tr>
          <td class="text-left">4.2. Tham gia trực tiếp trong Đội đạt giải Nhất</td>
          <td>2.5</td>
        </tr>
        <tr>
          <td class="text-left">4.3. Tham gia trực tiếp trong Đội đạt giải Nhì</td>
          <td>2</td>
        </tr>
        <tr>
          <td class="text-left">4.4. Tham gia trực tiếp trong Đội đạt giải Ba</td>
          <td>1.5</td>
        </tr>
        <tr>
          <td class="text-left">4.5.Có tham gia chương trình</td>
          <td>1</td>
        </tr>
        <tr>
          <td class="text-left">4.6. Không tham gia</td>
          <td>0</td>
        </tr>
        <tr>
          <td class="text-left">4.7. Có đăng ký nhưng không tham gia</td>
          <td>-0.5</td>
        </tr>
      </table>
    </el-tab-pane>
    <el-tab-pane label="3. Đào tạo và phát triển" name="third">
      <span style="font-weight: 700; font-size: medium"  slot="label" >3. Đào tạo và phát triển</span>
      <table class="table table-bordered justify-content-center">
        <tr style="background-color: rgba(156, 151, 151, 0.15)">
          <th>Tên hạng mục</th>
          <th>Chi tiết</th>
          <th>Điểm V-point</th>
          <th>Thao tác</th>
        </tr>
        <tr>
          <th rowspan="10" class="vertical-center1 text-left">5. Đào tạo</th>
          <td class="text-left">5.1. Người đào tạo đạt điểm ĐGC 5 điểm</td>
          <td>6</td>
          <td rowspan="4" style="font-weight: 700; color: #ED1C24;line-height: 160px;" >Chỉnh sửa</td>
        </tr>
        <tr>
          <td class="text-left">5.2. Người đào tạo đạt điểm ĐGC >= 4.5 - &lt;5 điểm</td>
          <td>4</td>
        </tr>
        <tr>
          <td class="text-left">5.3. Người đào tạo đạt điểm ĐGC >= 4 - &lt;4.5 điểm</td>
          <td>2</td>
        </tr>
        <tr>
          <td class="text-left">5.4. Người đào tạo đạt điểm ĐGC  4 điểm</td>
          <td>1.5</td>
        </tr>
        <tr>
          <td class="text-left">5.5. Điểm tham gia đào tạo > 105%</td>
          <td>1</td>
          <td rowspan="6" style="font-weight: 700; color: #ED1C24" class="vertical-center">Chỉnh sửa</td>
        </tr>
        <tr>
          <td class="text-left">5.6. Điểm tham gia đào tạo > 103% -  &lt;=105%</td>
          <td>1.5</td>
        </tr>
        <tr>
          <td class="text-left">5.7. Điểm tham gia đào tạo > 100% - &lt;=103%</td>
          <td>1</td>
        </tr>
        <tr>
          <td class="text-left">5.8. Điểm tham gia đào tạo > 90% - &lt;=100%</td>
          <td>0</td>
        </tr>
        <tr>
          <td class="text-left">5.9. Điểm tham gia đào tạo &lt;=90%</td>
          <td>-1</td>
        </tr>
        <tr>
          <td class="text-left">5.10. Chương trình phát triển cùng VMG</td>
          <td>0-50</td>
        </tr>
      </table>
    </el-tab-pane>
    <el-tab-pane label="" name="fourth">
      <span style="font-weight: 700; font-size: medium;"  slot="label" >4. Sáng tạo và Tuân thủ</span>
      <table class="table table-bordered justify-content-center">
        <tr style="background-color: rgba(156, 151, 151, 0.15)">
          <th>Tên hạng mục</th>
          <th>Chi tiết</th>
          <th>Điểm V-point</th>
          <th>Thao tác</th>
        </tr>
        <tr>
          <th rowspan="3" class=" text-left" style="line-height: 100px;">6. Cải tiến đổi mới
            (Sáng tạo)</th>
          <td class="text-left">6.1. Nhân sự có ý tưởng cải tiến đổi mới của tháng</td>
          <td>10</td>
          <td style="font-weight: 700; color: #ED1C24" >Chỉnh sửa</td>
        </tr>
        <tr>
          <td class="text-left">6.2. Điểm cải tiến đổi mới năm  &lt;=35 điểm</td>
          <td>1 điểm/ 1%</td>
          <td rowspan="2" style="font-weight: 700; color: #ED1C24; line-height: 70px;" >Chỉnh sửa</td>
        </tr>
        <tr>
          <td class="text-left">6.3. Điểm cải tiến đổi mới năm >35 điểm</td>
          <td>2</td>
        </tr>
        <tr>
          <th rowspan="4" class=" text-left" style="line-height: 200px;">7. Tôi yêu VMG
            (Tuân thủ)</th>
          <td class="text-left">7.1. Điểm test từ >85% - &lt;=100%</td>
          <td>20</td>
          <td rowspan="4" style="font-weight: 700; color: #ED1C24 ; line-height: 200px"  >Chỉnh sửa</td>
        </tr>
        <tr>
          <td class="text-left">7.2. Điểm test từ >75% -   &lt;=85%</td>
          <td>10</td>
        </tr>
        <tr>
          <td class="text-left">7.3. Đạt điểm từ >65% -  &lt;=75%</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="text-left">7.4. Đạt điểm từ dưới 55%</td>
          <td>0</td>
        </tr>

        <tr>
          <th rowspan="2" class=" text-left" style="line-height: 100px;">8. Kỷ luật
            (Tuân thủ)</th>
          <td class="text-left">8.1. Vi phạm nôi quy, quy định</td>
          <td>CEO quyết định</td>
        </tr>
        <tr>
          <td class="text-left">8.2. Khen thưởng nóng theo QĐ công ty</td>
          <td>CEO quyết định</td>
        </tr>
      </table>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import {UserService as userService} from "@/service/user-service";

export default {
  name: "ScoringRules",
  data() {
    return {
      symbols: [],
      activeName: 'first'
    };
  },
  async created(){
    await this.getAllSymbol()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async getAllSymbol(){
      this.symbols = (await userService.getAllSymbol()).data;
      console.log(this.symbols)
    }
  }
}
</script>

<style scoped>
.vertical-center {
  line-height: 200px;
}
.vertical-center1 {
  line-height: 400px;
}
</style>