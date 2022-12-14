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
  <el-tabs type="border-card" tab-position="top" stretch v-model="activeName" @tab-click="handleClick" style="width: 85%; margin-right: auto; margin-left: auto">
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
          <td class="text-left">1.1. Từ {{start130}}% trở lên</td>
          <td>{{ kpi130 }}</td>
          <td rowspan="5" style="font-weight: 700; color: #ED1C24" class="vertical-center"><el-button type="type" @click="renderKPI">Chỉnh sửa</el-button></td>
        </tr>
        <tr>
          <td class="text-left">1.2. Từ trên {{start95_130}}% đến dưới {{ end95_130 }}%</td>
          <td>{{ kpi95_130 }} điểm/ 1%</td>
        </tr>
        <tr>
          <td class="text-left">1.3. {{ start95 }}%</td>
          <td>{{kpi95}}</td>
        </tr>
        <tr>
          <td class="text-left">1.4. Từ {{ start70_95 }}% đến dưới {{ end70_95 }}%</td>
          <td>{{ kpi70_95 }} điểm/1%</td>
        </tr>
        <tr>
          <td class="text-left">1.5. Dưới {{ end70 }}%</td>
          <td>{{ kpi70 }}</td>
        </tr>
        <tr>
          <th rowspan="9 " class="vertical-center1 text-left">2. Nhân viên xuất sắc, Bộ phận xuất sắc</th>
          <td class="text-left">2.1. Nhân viên xuất sắc tháng</td>
          <td>{{ nvT }}</td>
          <td rowspan="9" style="font-weight: 700; color: #ED1C24" class="vertical-center1"><el-button type="type" @click="renderStaff">Chỉnh sửa</el-button></td>
        </tr>
        <tr>
          <td class="text-left">2.2. Nhân viên được đề cử giải NVXS quý</td>
          <td>{{ nvQ }}</td>
        </tr>
        <tr>
          <td class="text-left">2.3. Nhân viên xuất sắc quý các hạng mục</td>
          <td>{{ nvQM }}</td>
        </tr>
        <tr>
          <td class="text-left">2.4. Nhân viên xuất sắc quý</td>
          <td>{{ nvXQ }}</td>
        </tr>
        <tr>
          <td class="text-left">2.5.Nhân viên được đề cử giải Ngôi sao năm</td>
          <td>{{ nsN }}</td>
        </tr>
        <tr>
          <td class="text-left">2.6. Ngôi sao năm của các hạng mục</td>
          <td>{{ nvCHM }}</td>
        </tr>
        <tr>
          <td class="text-left">2.7. Ngôi sao năm của công ty</td>
          <td>{{ nvCT }}</td>
        </tr>
        <tr>
          <td class="text-left">2.8. Bộ phận xuất sắc tháng</td>
          <td>{{bpT}}</td>
        </tr>
        <tr>
          <td class="text-left">2.9. Bộ phận xuất sắc năm</td>
          <td>{{bpN}}</td>
        </tr>
      </table>

    </el-tab-pane>
    <el-tab-pane  name="second">
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
          <td class="text-left">3.1. Từ {{ startBcs110 }}% trở lên</td>
          <td>{{bcs110}}</td>
          <td rowspan="4" style="font-weight: 700; color: #ED1C24; line-height: 160px" ><el-button type="type" @click="renderBSC">Chỉnh sửa</el-button></td>
        </tr>
        <tr>
          <td class="text-left">3.2. Từ trên {{ startBcs105_110 }}% đến dưới {{ endBcs105_110 }}%</td>
          <td>{{ bcs105_110 }}</td>
        </tr>
        <tr>
          <td class="text-left">3.3. Từ {{ startBcs100_105 }}% đến dưới {{ endBcs100_105 }}%</td>
          <td>{{ bcs100_105 }}</td>
        </tr>
        <tr>
          <td class="text-left">3.4. Dưới {{ endBcs100 }}%</td>
          <td>{{ bcs100 }}</td>
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
          <td class="text-left">5.1. Người đào tạo đạt điểm ĐGC {{ startDgc }} điểm</td>
          <td>{{ dgc }}</td>
          <td rowspan="4" style="font-weight: 700; color: #ED1C24;line-height: 160px;" ><el-button type="type" @click="renderTea">Chỉnh sửa</el-button></td>
        </tr>
        <tr>
          <td class="text-left">5.2. Người đào tạo đạt điểm ĐGC >= {{startdgc1}} - &lt; {{enddgc1}} điểm</td>
          <td>{{ dgc1 }}</td>
        </tr>
        <tr>
          <td class="text-left">5.3. Người đào tạo đạt điểm ĐGC >= {{ startdgc2 }} - &lt; {{enddgc2}} điểm</td>
          <td>{{dgc2}}</td>
        </tr>
        <tr>
          <td class="text-left">5.4. Người đào tạo đạt điểm ĐGC {{ enddgc3 }} điểm</td>
          <td>{{ dgc3 }}</td>
        </tr>
        <tr>
          <td class="text-left">5.5. Điểm tham gia đào tạo > {{ startdt1 }}%</td>
          <td>{{ dt1 }}</td>
          <td rowspan="6" style="font-weight: 700; color: #ED1C24" class="vertical-center"><el-button type="type" @click="renderJoin">Chỉnh sửa</el-button></td>
        </tr>
        <tr>
          <td class="text-left">5.6. Điểm tham gia đào tạo > {{ startdt2 }}% -  &lt;= {{ enddt2 }}%</td>
          <td>{{ dt2 }}</td>
        </tr>
        <tr>
          <td class="text-left">5.7. Điểm tham gia đào tạo > {{ startdt3 }}% - &lt;= {{ enddt3 }}%</td>
          <td>{{dt3}}</td>
        </tr>
        <tr>
          <td class="text-left">5.8. Điểm tham gia đào tạo > {{ startdt4 }}% - &lt;= {{ enddt4 }}%</td>
          <td>{{ dt4 }}</td>
        </tr>
        <tr>
          <td class="text-left">5.9. Điểm tham gia đào tạo &lt;= {{ enddt5 }}%</td>
          <td>{{ dt5 }}</td>
        </tr>
        <tr>
          <td class="text-left">5.10. Chương trình phát triển cùng VMG</td>
          <td></td>
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
          <td>{{ dmt }}</td>
          <td style="font-weight: 700; color: #ED1C24" ><el-button type="type" @click="renderDMT">Chỉnh sửa</el-button></td>
        </tr>
        <tr>
          <td class="text-left">6.2. Điểm cải tiến đổi mới năm  &lt;={{ enddmn }} điểm</td>
          <td>Nhập điểm</td>
          <td rowspan="2" style="font-weight: 700; color: #ED1C24; line-height: 70px;" ><el-button type="type" @click="renderDMN">Chỉnh sửa</el-button></td>
        </tr>
        <tr>
          <td class="text-left">6.3. Điểm cải tiến đổi mới năm >{{ enddmn }} điểm</td>
          <td>Nhập điểm</td>
        </tr>
        <tr>
          <th rowspan="4" class=" text-left" style="line-height: 200px;">7. Tôi yêu VMG
            (Tuân thủ)</th>
          <td class="text-left">7.1. Điểm test từ >{{ starttest85_100 }}% - &lt;= {{ endtest85_100 }}%</td>
          <td>{{ test85_100 }}</td>
          <td rowspan="4" style="font-weight: 700; color: #ED1C24 ; line-height: 200px"  ><el-button type="type" @click="renderLove">Chỉnh sửa</el-button></td>
        </tr>
        <tr>
          <td class="text-left">7.2. Điểm test từ >{{ starttest75_85 }}% -   &lt;= {{ endtest75_85 }}%</td>
          <td>{{ test75_85 }}</td>
        </tr>
        <tr>
          <td class="text-left">7.3. Đạt điểm từ >{{ starttest65_75 }}% -  &lt;= {{ endtest65_75 }}%</td>
          <td>{{ test65_75 }}</td>
        </tr>
        <tr>
          <td class="text-left">7.4. Đạt điểm từ dưới {{ endtest65 }}%</td>
          <td>{{ test65 }}</td>
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
  <el-dialog z-index="1" title="Chỉnh sửa quy tắc" :visible.sync="dialogKPIVisible"
             center width="60%" :before-close="handleClose" :show-close="false">
    <h6>1. KPI cá nhân hàng tháng</h6>
    <el-table :data="kpiData" border :row-class-name="valiKPI" >
      <el-table-column label="STT" width="50">
        <template v-slot="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Điểm chặn dưới" width="140">
        <template v-slot="scope">
          <input :id="scope.row.start" type="text" v-model="scope.row.start"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="condition" label="Điều kiện" width="100"></el-table-column>
      <el-table-column label="Điểm chặn trên" width="140">
        <template v-slot="scope">
          <input :id="scope.row.end" type="text" v-model="scope.row.end"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column label="Điểm V-point" width="120">
        <template v-slot="scope">
          <input :id="scope.row.point" type="text" v-model="scope.row.point"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="note" label="Chú thích" ></el-table-column>
    </el-table>
    <div class="mt-4 d-flex justify-content-center">
      <el-button type="primary" round @click="updateKPI">Xác nhận</el-button>
      <el-button style="width: 6.5rem" type="info" round @click="dialogKPIVisible= false">Huỷ</el-button>
    </div>
  </el-dialog>

  <el-dialog z-index="1" title="Chỉnh sửa quy tắc" :visible.sync="dialogStaffVisible"
             center width="60%" :before-close="handleClose" :show-close="false">
    <h6>2. Nhân viên xuất sắc, bộ phận xuất sắc</h6>
    <el-table :data="staffData" border :row-class-name="valiStaff">
      <el-table-column label="STT" width="50">
        <template v-slot="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column property="detail" label="Chi tiết"></el-table-column>
      <el-table-column label="Điểm V-point" width="120">
        <template v-slot="scope">
          <input :id="scope.row.point" type="text" v-model="scope.row.point"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4 d-flex justify-content-center">
      <el-button type="primary" round @click="updateStaff">Xác nhận</el-button>
      <el-button style="width: 6.5rem" type="info" round @click="dialogStaffVisible= false">Huỷ</el-button>
    </div>
  </el-dialog>

  <el-dialog z-index="1" title="Chỉnh sửa quy tắc" :visible.sync="dialogBSCVisible"
             center width="60%" :before-close="handleClose" :show-close="false">
    <h6>3. BSC bộ phận</h6>
    <el-table :data="bscData" border :row-class-name="valiKPI" >
      <el-table-column label="STT" width="50">
        <template v-slot="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Điểm chặn dưới" width="140">
        <template v-slot="scope">
          <input :id="scope.row.start" type="text" v-model="scope.row.start"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="condition" label="Điều kiện" width="100"></el-table-column>
      <el-table-column label="Điểm chặn trên" width="140">
        <template v-slot="scope">
          <input :id="scope.row.end" type="text" v-model="scope.row.end"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="point" label="Điểm V-point" width="120">
        <template v-slot="scope">
          <input :id="scope.row.point" type="text" v-model="scope.row.point"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="note" label="Chú thích" ></el-table-column>
    </el-table>
    <div class="mt-4 d-flex justify-content-center">
      <el-button type="primary" round @click="updateBSC">Xác nhận</el-button>
      <el-button style="width: 6.5rem" type="info" round @click="dialogBSCVisible= false">Huỷ</el-button>
    </div>
  </el-dialog>

  <el-dialog z-index="1" title="Chỉnh sửa quy tắc" :visible.sync="dialogTeaVisible"
             center width="60%" :before-close="handleClose" :show-close="false">
    <h6>5. Đào tạo - Người Đào Tạo</h6>
    <el-table :data="teaData" border :row-class-name="valiKPI" >
      <el-table-column label="STT" width="50">
        <template v-slot="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Điểm chặn dưới" width="140">
        <template v-slot="scope">
          <input :id="scope.row.start" type="text" v-model="scope.row.start"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="condition" label="Điều kiện" width="100"></el-table-column>
      <el-table-column label="Điểm chặn trên" width="140">
        <template v-slot="scope">
          <input :id="scope.row.end" type="text" v-model="scope.row.end"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="point" label="Điểm V-point" width="120">
        <template v-slot="scope">
          <input :id="scope.row.point" type="text" v-model="scope.row.point"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="note" label="Chú thích" ></el-table-column>
    </el-table>
    <div class="mt-4 d-flex justify-content-center">
      <el-button type="primary" round @click="updateTea">Xác nhận</el-button>
      <el-button style="width: 6.5rem" type="info" round @click="dialogTeaVisible= false">Huỷ</el-button>
    </div>
  </el-dialog>

  <el-dialog z-index="1" title="Chỉnh sửa quy tắc" :visible.sync="dialogJoinVisible"
             center width="60%" :before-close="handleClose" :show-close="false">
    <h6>5. Đào tạo - Tham Gia Đào Tạo</h6>
    <el-table :data="joinData" border :row-class-name="valiKPI" >
      <el-table-column label="STT" width="50">
        <template v-slot="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Điểm chặn dưới" width="140">
        <template v-slot="scope">
          <input :id="scope.row.start" type="text" v-model="scope.row.start"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="condition" label="Điều kiện" width="100"></el-table-column>
      <el-table-column label="Điểm chặn trên" width="140">
        <template v-slot="scope">
          <input :id="scope.row.end" type="text" v-model="scope.row.end"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="point" label="Điểm V-point" width="120">
        <template v-slot="scope">
          <input :id="scope.row.point" type="text" v-model="scope.row.point"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="note" label="Chú thích" ></el-table-column>
    </el-table>
    <div class="mt-4 d-flex justify-content-center">
      <el-button type="primary" round @click="updateJoin">Xác nhận</el-button>
      <el-button style="width: 6.5rem" type="info" round @click="dialogJoinVisible= false">Huỷ</el-button>
    </div>
  </el-dialog>

  <el-dialog z-index="1" title="Chỉnh sửa quy tắc" :visible.sync="dialogDMTVisible"
             center width="60%" :before-close="handleClose" :show-close="false">
    <h6>6. Cải tiến đổi mới</h6>
    <el-table :data="dmtData" border :row-class-name="valiStaff">
      <el-table-column label="STT" width="50">
        <template v-slot="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column property="detail" label="Chi tiết"></el-table-column>
      <el-table-column label="Điểm V-point" width="120">
        <template v-slot="scope">
          <input :id="scope.row.point" type="text" v-model="scope.row.point"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4 d-flex justify-content-center">
      <el-button type="primary" round @click="updateDMT">Xác nhận</el-button>
      <el-button style="width: 6.5rem" type="info" round @click="dialogDMTVisible= false">Huỷ</el-button>
    </div>
  </el-dialog>

  <el-dialog z-index="1" title="Chỉnh sửa quy tắc" :visible.sync="dialogLoveVisible"
             center width="60%" :before-close="handleClose" :show-close="false">
    <h6>7. Tôi yêu VMG</h6>
    <el-table :data="loveData" border :row-class-name="valiKPI" >
      <el-table-column label="STT" width="50">
        <template v-slot="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Điểm chặn dưới" width="140">
        <template v-slot="scope">
          <input :id="scope.row.start" type="text" v-model="scope.row.start"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="condition" label="Điều kiện" width="100"></el-table-column>
      <el-table-column label="Điểm chặn trên" width="140">
        <template v-slot="scope">
          <input :id="scope.row.end" type="text" v-model="scope.row.end"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="point" label="Điểm V-point" width="120">
        <template v-slot="scope">
          <input :id="scope.row.point" type="text" v-model="scope.row.point"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="note" label="Chú thích" ></el-table-column>
    </el-table>
    <div class="mt-4 d-flex justify-content-center">
      <el-button type="primary" round @click="updateLove">Xác nhận</el-button>
      <el-button style="width: 6.5rem" type="info" round @click="dialogLoveVisible= false">Huỷ</el-button>
    </div>
  </el-dialog>

  <el-dialog z-index="1" title="Chỉnh sửa quy tắc" :visible.sync="dialogDMNVisible"
             center width="60%" :before-close="handleClose" :show-close="false">
    <h6>6. Cải tiến đối mới năm</h6>
    <el-table :data="dmnData" border :row-class-name="valiKPI" >
      <el-table-column label="STT" width="50">
        <template v-slot="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Điểm chặn dưới" width="140">
        <template v-slot="scope">
          <input :id="scope.row.start" type="text" v-model="scope.row.start"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="condition" label="Điều kiện" width="100"></el-table-column>
      <el-table-column label="Điểm chặn trên" width="140">
        <template v-slot="scope">
          <input :id="scope.row.end" type="text" v-model="scope.row.end"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="point" label="Điểm V-point" width="120">
        <template v-slot="scope">
          <input :id="scope.row.point" type="text" v-model="scope.row.point"
                 style="width: 100%; border: none; text-align: center">
        </template>
      </el-table-column>
      <el-table-column property="note" label="Chú thích" ></el-table-column>
    </el-table>
    <div class="mt-4 d-flex justify-content-center">
      <el-button type="primary" round @click="updateDMN">Xác nhận</el-button>
      <el-button style="width: 6.5rem" type="info" round @click="dialogDMNVisible= false">Huỷ</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {UserService as userService} from "@/service/user-service";
import ExcelService from "@/service/excel.service";
import swal from "sweetalert2";

export default {
  name: "ScoringRules",
  data() {
    return {
      symbols: [],
      kpi130: '',
      kpi95_130:'',
      start95_130:'',
      end95_130:'',
      kpi95:'',
      start95:'',
      kpi70_95:'',
      start70_95:'',
      end70_95:'',
      kpi70:'',
      end70:'',
      nvQ: '',
      nvT: '',
      nvQM: '',
      nvXQ: '',
      nsN: '',
      nvCHM: '',
      nvCT: '',
      bpT: '',
      bpN: '',
      bcs110: '',
      startBcs110: '',
      bcs105_110: '',
      startBcs105_110: '',
      endBcs105_110: '',
      bcs100_105: '',
      startBcs100_105: '',
      endBcs100_105: '',
      bcs100: '',
      endBcs100: '',
      dgc: '',
      startDgc: '',
      dgc1: '',
      startdgc1: '',
      enddgc1: '',
      dgc2: '',
      startdgc2: '',
      enddgc2: '',
      dgc3: '',
      startdgc3: '',
      enddgc3: '',
      dt1: '',
      startdt1: '',
      enddt1: '',
      dt2: '',
      startdt2: '',
      enddt2: '',
      dt3: '',
      startdt3: '',
      enddt3: '',
      dt4: '',
      startdt4: '',
      enddt4: '',
      dt5: '',
      startdt5: '',
      enddt5: '',
      dmt: '',
      dmn: '',
      enddmn: '',
      ctn: '',
      test85_100: '',
      starttest85_100: '',
      endtest85_100: '',
      test75_85: '',
      starttest75_85: '',
      endtest75_85: '',
      test65_75: '',
      starttest65_75: '',
      endtest65_75: '',
      test65: '',
      endtest65: '',
      start130: '',
      activeName: 'first',
      kpiData: null,
      dialogKPIVisible: false,
      staffData: null,
      dialogStaffVisible: false,
      bscData: null,
      dialogBSCVisible: false,
      teaData: null,
      dialogTeaVisible: false,
      joinData: null,
      dialogJoinVisible: false,
      dmtData: null,
      dialogDMTVisible: false,
      dmnData: null,
      dialogDMNVisible: false,
      loveData: null,
      dialogLoveVisible: false,
      nxstData: [],
      nvxsqData: [],
      nvxsNData: [],
      bpxstData: [],
      bpxsnData: []
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
      for (let i = 0; i < this.symbols.length; i++) {
        if (this.symbols[i].id === 5){
          this.kpi130 = this.symbols[i].point
          this.start130 = this.symbols[i].start
        }
        if (this.symbols[i].id === 4){
          this.kpi95_130 = this.symbols[i].point
          this.start95_130 = this.symbols[i].start
          this.end95_130 = this.symbols[i].end
        }
        if (this.symbols[i].id === 3){
          this.kpi95 = this.symbols[i].point
          this.start95 = this.symbols[i].start
        }
        if (this.symbols[i].id === 2){
          this.kpi70_95 = this.symbols[i].point
          this.start70_95 = this.symbols[i].start
          this.end70_95 = this.symbols[i].end
        }
        if (this.symbols[i].id === 1){
          this.kpi70 = this.symbols[i].point
          this.end70 = this.symbols[i].end
        }
        if (this.symbols[i].id === 7){
          this.nvQ = this.symbols[i].point
        }
        if (this.symbols[i].id === 6){
          this.nvT = this.symbols[i].point
        }
        if (this.symbols[i].id === 8){
          this.nvQM = this.symbols[i].point
        }
        if (this.symbols[i].id === 9){
          this.nvXQ = this.symbols[i].point
        }
        if (this.symbols[i].id === 10){
          this.nsN = this.symbols[i].point
        }
        if (this.symbols[i].id === 11){
          this.nvCHM = this.symbols[i].point
        }
        if (this.symbols[i].id === 12){
          this.nvCT = this.symbols[i].point
        }
        if (this.symbols[i].id === 13){
          this.bpT = this.symbols[i].point
        }
        if (this.symbols[i].id === 14){
          this.bpN = this.symbols[i].point
        }
        if (this.symbols[i].id === 15){
          this.bcs110 = this.symbols[i].point
          this.startBcs110 = this.symbols[i].start
        }
        if (this.symbols[i].id === 16){
          this.bcs105_110 = this.symbols[i].point
          this.startBcs105_110 = this.symbols[i].start
          this.endBcs105_110 = this.symbols[i].end
        }
        if (this.symbols[i].id === 17){
          this.bcs100_105 = this.symbols[i].point
          this.startBcs100_105 = this.symbols[i].start
          this.endBcs100_105 = this.symbols[i].end
        }
        if (this.symbols[i].id === 18){
          this.bcs100 = this.symbols[i].point
          this.endBcs100 = this.symbols[i].end
        }
        if (this.symbols[i].id === 26){
          this.dgc = this.symbols[i].point
          this.startDgc = this.symbols[i].start
        }
        if (this.symbols[i].id === 27){
          this.dgc1 = this.symbols[i].point
          this.startdgc1 = this.symbols[i].start
          this.enddgc1 = this.symbols[i].end
        }
        if (this.symbols[i].id === 28){
          this.dgc2 = this.symbols[i].point
          this.startdgc2 = this.symbols[i].start
          this.enddgc2 = this.symbols[i].end
        }
        if (this.symbols[i].id === 29){
          this.dgc3 = this.symbols[i].point
          this.startdgc3 = this.symbols[i].start
          this.enddgc3 = this.symbols[i].end
        }
        if (this.symbols[i].id === 30){
          this.dt1 = this.symbols[i].point
          this.startdt1 = this.symbols[i].start
          this.enddt1 = this.symbols[i].end
        }
        if (this.symbols[i].id === 31){
          this.dt2 = this.symbols[i].point
          this.startdt2 = this.symbols[i].start
          this.enddt2 = this.symbols[i].end
        }
        if (this.symbols[i].id === 32){
          this.dt3 = this.symbols[i].point
          this.startdt3 = this.symbols[i].start
          this.enddt3 = this.symbols[i].end
        }
        if (this.symbols[i].id === 33){
          this.dt4 = this.symbols[i].point
          this.startdt4 = this.symbols[i].start
          this.enddt4 = this.symbols[i].end
        }
        if (this.symbols[i].id === 34){
          this.dt5 = this.symbols[i].point
          this.startdt5 = this.symbols[i].start
          this.enddt5 = this.symbols[i].end
        }
        if (this.symbols[i].id === 36){
          this.dmt = this.symbols[i].point
        }
        if (this.symbols[i].id === 37){
          this.dmn = this.symbols[i].point
          this.enddmn = this.symbols[i].end
        }
        if (this.symbols[i].id === 30){
          this.dt1 = this.symbols[i].point
        }
        if (this.symbols[i].id === 38){
          this.test85_100 = this.symbols[i].point
          this.starttest85_100 = this.symbols[i].start
          this.test85_100 = this.symbols[i].end
        }
        if (this.symbols[i].id === 39){
          this.test75_85 = this.symbols[i].point
          this.starttest75_85 = this.symbols[i].start
          this.endtest75_85 = this.symbols[i].end
        }
        if (this.symbols[i].id === 40){
          this.test65_75 = this.symbols[i].point
          this.starttest65_75 = this.symbols[i].start
          this.endtest65_75 = this.symbols[i].end
        }
        if (this.symbols[i].id === 41){
          this.test65 = this.symbols[i].point
          this.endtest65 = this.symbols[i].end
        }
      }
      console.log(this.symbols)
    },
    renderKPI() {
      this.kpiData = [
        {
          id: 5,
          start: this.start130,
          end: 1300,
          point: this.kpi130,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 4,
          start: this.start95_130,
          end: this.end95_130,
          point: this.kpi95_130,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return '1 điểm/1%.'
          }
        },
        {
          id: 3,
          start: this.start95,
          end: this.start95,
          point: this.kpi95,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 2,
          start: this.start70_95,
          end: this.end70_95,
          point: this.kpi70_95,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return '-1 điểm/1%.'
          }
        },
        {
          id: 1,
          start: 0,
          end: this.end70,
          point: this.kpi70,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        }
      ];
      console.log(this.kpiData)
      this.dialogKPIVisible = true
    },
    renderStaff() {
      this.staffData = [
        {
          id: 6,
          detail: 'Nhân viên xuất sắc tháng',
          point: this.nvT
        },
        {
          id: 7,
          detail: 'Nhân viên được đề cử giải NVXS quý',
          point: this.nvQ
        },
        {
          id: 8,
          detail: 'Nhân viên xuất sắc quý các hạng mục',
          point: this.nvQM
        },
        {
          id: 9,
          detail: 'Nhân viên xuất sắc quý',
          point: this.nvXQ
        },
        {
          id: 10,
          detail: 'Nhân viên được đề cử giải Ngôi sao năm',
          point: this.nsN
        },
        {
          id: 11,
          detail: 'Ngôi sao năm của các hạng mục',
          point: this.nvCHM
        },
        {
          id: 12,
          detail: 'Ngôi sao năm của công ty',
          point: this.nvCT
        },
        {
          id: 13,
          detail: 'Bộ phận xuất sắc tháng',
          point: this.bpT
        },
        {
          id: 14,
          detail: 'Bộ phận xuất sắc năm',
          point: this.bpT
        }
      ];
      console.log(this.staffData)
      this.dialogStaffVisible = true
    },
    renderDMT() {
      this.dmtData = [
        {
          id: 36,
          detail: 'Cải tiến đổi mới',
          point: this.dmt
        }
      ];
      console.log(1,this.dmtData)
      this.dialogDMTVisible = true
    },
    renderBSC() {
      this.bscData = [
        {
          id: 15,
          start: this.startBcs110,
          end: 1100,
          point: this.bcs110,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 16,
          start: this.startBcs105_110,
          end: this.endBcs105_110,
          point: this.bcs105_110,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 17,
          start: this.startBcs100_105,
          end: this.endBcs100_105,
          point: this.bcs100_105,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 18,
          start: 0,
          end: this.endBcs100,
          point: this.bcs100,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Điểm đạt được.'
          }
        }
      ];
      console.log(this.bscData)
      this.dialogBSCVisible = true
    },
    renderTea() {
      this.teaData = [
        {
          id: 26,
          start: this.startDgc,
          end: 1100,
          point: this.dgc,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 27,
          start: this.startdgc1,
          end: this.enddgc1,
          point: this.dgc1,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 28,
          start: this.startdgc2,
          end: this.enddgc2,
          point: this.dgc2,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        }
      ];
      console.log(this.teaData)
      this.dialogTeaVisible = true
    },
    renderJoin() {
      this.joinData = [
        {
          id: 26,
          start: this.startDgc,
          end: 1100,
          point: this.dgc,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 27,
          start: this.startdgc1,
          end: this.enddgc1,
          point: this.dgc1,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 28,
          start: this.startdgc2,
          end: this.enddgc2,
          point: this.dgc2,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        }
      ];
      console.log(this.JoinData)
      this.dialogJoinVisible = true
    },
    renderLove() {
      this.loveData = [
        {
          id: 40,
          start: this.starttest65_75,
          end: this.endtest65_75,
          point: this.test65_75,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        },
        {
          id: 41,
          start: 0,
          end: this.endtest65,
          point: this.test65,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        }
      ];
      console.log(this.loveData)
      this.dialogLoveVisible = true
    },
    renderDMN() {
      this.dmnData = [
        {
          id: 37,
          start: 0,
          end: this.enddmn,
          point: this.dmn,
          condition: '<= X <',
          backgroundClass: "success-row",
          get note() {
            return 'Số điểm đạt được.'
          }
        }
      ];
      console.log(this.dmnData)
      this.dialogDMNVisible = true
    },
    updateKPI() {
      console.log(this.kpiData)
      ExcelService.updateMark(1, this.kpiData).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công'
        })
        this.getAllSymbol()
      }).catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Opoooss...',
          text: 'Đã có lỗi xảy ra!'
        })
      })
    },
    updateStaff() {
      this.staffData.forEach(data => {
        if(data.id === 6) {
          this.nxstData.push(data)
        }else if(data.id === 8 || data.id === 9 || data.id === 7) {
          this.nvxsqData.push(data)
        }else if(data.id === 10 || data.id === 11 || data.id === 12) {
          this.nvxsNData.push(data)
        }else if(data.id === 13) {
          this.bpxstData.push(data)
        }else if(data.id === 14) {
          this.bpxsnData.push(data)
        }
      })
      ExcelService.updateMark(2, this.nxstData).then(() => {
        ExcelService.updateMark(16, this.nvxsqData).then(() => {
          ExcelService.updateMark(17, this.nvxsNData).then(() => {
            ExcelService.updateMark(9, this.bpxstData).then(() => {
              ExcelService.updateMark(10, this.bpxsnData).then(() => {
                swal.fire({
                  icon: 'success',
                  title: 'Cập nhật thành công'
                })
                this.getAllSymbol()
              }).catch(() => {
                swal.fire({
                  icon: 'error',
                  title: 'Opoooss...',
                  text: 'Đã có lỗi xảy ra!'
                })
              })
            }).catch(() => {
              swal.fire({
                icon: 'error',
                title: 'Opoooss...',
                text: 'Đã có lỗi xảy ra!'
              })
            })
          }).catch(() => {
            swal.fire({
              icon: 'error',
              title: 'Opoooss...',
              text: 'Đã có lỗi xảy ra!'
            })
          })
        }).catch(() => {
          swal.fire({
            icon: 'error',
            title: 'Opoooss...',
            text: 'Đã có lỗi xảy ra!'
          })
        })
      }).catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Opoooss...',
          text: 'Đã có lỗi xảy ra!'
        })
      })
    },
    updateDMT() {
      console.log(this.dmtData)
      ExcelService.updateMark(6, this.dmtData).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công'
        })
        this.getAllSymbol()
      }).catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Opoooss...',
          text: 'Đã có lỗi xảy ra!'
        })
      })
    },
    updateBSC() {
      console.log(this.bscData)
      ExcelService.updateMark(3, this.bscData).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công'
        })
        this.getAllSymbol()
      }).catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Opoooss...',
          text: 'Đã có lỗi xảy ra!'
        })
      })
    },
    updateTea() {
      console.log(this.teaData)
      ExcelService.updateMark(5, this.teaData).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công'
        })
        this.getAllSymbol()
      }).catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Opoooss...',
          text: 'Đã có lỗi xảy ra!'
        })
      })
    },
    updateJoin() {
      console.log(this.joinData)
      ExcelService.updateMark(11, this.joinData).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công'
        })
        this.getAllSymbol()
      }).catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Opoooss...',
          text: 'Đã có lỗi xảy ra!'
        })
      })
    },
    updateLove() {
      console.log(this.loveData)
      ExcelService.updateMark(7, this.loveData).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công'
        })
        this.getAllSymbol()
      }).catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Opoooss...',
          text: 'Đã có lỗi xảy ra!'
        })
      })
    },
    updateDMN() {
      console.log(this.dmnData)
      ExcelService.updateMark(19, this.dmnData).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công'
        })
        this.getAllSymbol()
      }).catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Opoooss...',
          text: 'Đã có lỗi xảy ra!'
        })
      })
    },
    valiKPI({row}) {
      const numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/
      if(!numberRegex.test(row.start)) {
        return 'warning-row'
      }else if (!numberRegex.test(row.point)) {
        return 'warning-row'
      }else if (!numberRegex.test(row.end)) {
        return 'warning-row'
      }else {
        return ''
      }
    },
    valiStaff({row}) {
      const numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/
      if (!numberRegex.test(row.point)) {
        return 'warning-row'
      }else {
        return ''
      }
    },
    handleClose() {

    }
  }
}
</script>

<style>
.vertical-center {
  line-height: 200px;
}
.vertical-center1 {
  line-height: 400px;
}
.el-table .cell {
  text-align: center;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>