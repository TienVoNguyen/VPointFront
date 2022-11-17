<template>
  <div class="p-4">
    <div v-if="addFileStatus">
      <h4 class="header-import">Thêm mới dữ liệu tính điểm V-Point</h4>
      <b-form-file @change="addFile($event)"
                   accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                   v-model="file" class="mb-2"></b-form-file>
      <p class="text-left">Tải xuống <a style="color: red" href="http://localhost:8080/assets/ThemDiemNhanVien.xlsx">File
        mẫu</a> từ hệ thống để thuận tiện hơn cho việc import.</p>
      <div class="mt-2 text-left" style="position: relative; height: 35px">
        <p class="text-left" style="color: #246CD9;font-style: normal;
                              font-weight: 700;
                              font-size: 24px;
                              line-height: 38px;">Dữ liệu trong file</p>
        <div class="text-right" style="position: relative; top: -43px; right: 0;">
          <b-button variant="danger" @click="addMark" :disabled="!addStatus" class="mr-2">Thêm điểm</b-button>
          <b-button variant="success" @click="file = null; items=[]; addStatus=false">Reset</b-button>
        </div>
      </div>
      <el-table class="mt-4"
                border
                :data="items"
                style="width: 100%">
        <el-table-column
            prop="staff_id"
            label="Mã NV"
            width="100">
          <template v-slot="scope">
            <input :id="scope.row.staff_id" class="success-row" type="text" v-model="scope.row.staff_id"
                   style="width: 100%; border: none"
                   v-on:keyup="vali(scope.row, scope)">
          </template>
        </el-table-column>
        <el-table-column
            prop="fullName"
            label="Tên"
            width="180">
          <template v-slot="scope">
            <input type="text" :value="scope.row.fullName" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="department"
            label="Bộ Phận">
        </el-table-column>
        <el-table-column
            prop="month"
            label="Tháng">
          <template v-slot="scope">
            <input type="number" min="1" max="12" v-model="scope.row.month" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="year"
            label="Năm">
          <template v-slot="scope">
            <input type="text" v-model="scope.row.year" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="kpi"
            label="KPI">
          <template v-slot="scope">
            <input type="text" v-model="scope.row.kpi" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="bestDepartmentMonth"
            label="NVXS Tháng"
            width="70">
          <template v-slot="scope">
            <div class="d-flex justify-content-center">
              <input type="checkbox" :name="scope.row.staff_id+'nvxst'" v-model="scope.row.bestDepartmentMonth"
                     value="true">
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="bestDepartmentQuarter"
            label="NVXS Quý"
            width="70">
        </el-table-column>
        <el-table-column
            prop="bestDepartmentYear"
            label="NVXS Năm"
            width="70">
        </el-table-column>
        <el-table-column
            prop="excellentDepartmentMonth"
            label="BPXS Tháng"
            width="70">
          <template v-slot="scope">
            <div class="d-flex justify-content-center">
              <input type="checkbox" :name="scope.row.staff_id+'bpxsm'" v-model="scope.row.excellentDepartmentMonth"
                     value="true">
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="excellentDepartmentYear"
            label="BPXS Năm"
            width="70">
          <template v-slot="scope">
            <div class="d-flex justify-content-center">
              <input type="checkbox" :name="scope.row.staff_id+'bpxsy'" v-model="scope.row.excellentDepartmentYear"
                     value="true">
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="bcsDepartment"
            label="BSC BP">
          <template v-slot="scope">
            <input type="number" v-model="scope.row.bcsDepartment" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="jointActivities"
            label="HDC">
          <template v-slot="scope">
            <input type="number" v-model="scope.row.jointActivities" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="train"
            label="TG ĐT">
          <template v-slot="scope">
            <input type="text" v-model="scope.row.train" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="trainStaff"
            label="GV ĐT">
          <template v-slot="scope">
            <input type="text" v-model="scope.row.trainStaff" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="improve"
            label="Sáng Tạo"
            width="60">
          <template v-slot="scope">
            <div class="d-flex justify-content-center">
              <input type="checkbox" :name="scope.row.staff_id+'improve'" v-model="scope.row.improve" value="true">
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="loveVmg"
            label="I Love VMG"
            width="70">
          <template v-slot="scope">
            <input type="text" v-model="scope.row.loveVmg" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="trainVmg"
            label="PT VMG">
          <template v-slot="scope">
            <input type="text" v-model="scope.row.trainVmg" style="width: 100%; border: none">
          </template>
        </el-table-column>

        <el-table-column
            prop="disciplineBonus"
            label="Thưởng">
          <template v-slot="scope">
            <input type="number" v-model="scope.row.disciplineBonus" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="disciplineViolate"
            label="Phạt">
          <template v-slot="scope">
            <input type="number" max="0" min="-999" v-model="scope.row.disciplineViolate"
                   style="width: 100%; border: none">
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="!addFileStatus">
      <el-table
          border
          :data="listMark">
        <el-table-column
            label="STT"
            width="80"
        align="center">
          <template v-slot="scope">
            <p >{{ scope.$index + 1 }}</p>
          </template>
        </el-table-column>
        <el-table-column
            prop="staff_id"
            label="Mã nhân viên"
            width="150">
        </el-table-column>
        <el-table-column
            prop="fullName"
            label="Họ tên"
            width="200">
        </el-table-column>
        <el-table-column
            prop="department"
            label="Bộ phận"
            width="200">
        </el-table-column>
        <el-table-column
            prop="month"
            label="Tháng"
            width="80">
        </el-table-column>
        <el-table-column
            prop="year"
            label="Năm"
            width="80">
        </el-table-column>
        <el-table-column
            label="Tổng điểm"
            width="80">
          <template v-slot="scope">
            {{
              scope.row.pointKPI + scope.row.pointBestDepartmentMonth + scope.row.pointBestDepartmentQuarter + scope.row.pointBestDepartmentYear
              + scope.row.pointBCSDepartment + scope.row.pointJointActivities + scope.row.pointLoveVmg +
              +scope.row.pointTrain + scope.row.pointTrainStaff + scope.row.pointTrainVmg + scope.row.pointImprove
              + scope.row.pointDisciplineBonus + scope.row.pointDisciplineViolate + scope.row.pointExcellentDepartmentMonth
              + scope.row.pointExcellentDepartmentMonth + scope.row.pointExcellentDepartmentYear
            }}
          </template>
        </el-table-column>
        <el-table-column
            label="Thao tác">
          <template slot-scope="scope">
            <router-link :to="`/admin/AdminSeeDetailVPoint/${scope.row.year}/${scope.row.month}/${scope.row.id}`"
                         style="color: white">
              <el-button class="btn btn-warning m-2 text-black">
                Xem chi tiết
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ExcelService from "@/service/excel.service";
import swal from 'sweetalert2';

const ExcelJS = require('exceljs');
import * as fs from 'file-saver';

export default {
  name: "ImportExcel",
  data() {
    return {
      successfully: false,
      items: [],
      file: null,
      addStatus: false,
      listMark: [],
      visibleTable: false,
      addFileStatus: true
    }
  },
  methods: {
    vali(data) {
      let id = '#' + data.staff_id
      let bg = document.querySelector(id)
      if (data.staff_id.length < 3) {
        bg.classList.replace('success-row', 'warning-row')
      } else {
        bg.classList.replace('warning-row', 'success-row')
      }
    },
    validateState(ref) {
      if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    addFile(event) {
      let reader = new FileReader()
      reader.onloadend = async () => {
        let workbook = new ExcelJS.Workbook()
        await workbook.xlsx.load(reader.result)
        const worksheet = workbook.getWorksheet('ImportMark')
        try {
          worksheet.eachRow((row, index) => {
            if (index > 2) {
              let mark = {
                staff_id: row.getCell('B').value,
                department: row.getCell('C').value,
                fullName: row.getCell('D').value,
                year: row.getCell('E').value,
                month: row.getCell('F').value,
                kpi: row.getCell('G').value,
                bestDepartmentMonth: row.getCell('H').value,
                bestDepartmentQuarter: row.getCell('I').value,
                bestDepartmentYear: row.getCell('J').value,
                excellentDepartmentMonth: row.getCell('K').value,
                excellentDepartmentYear: row.getCell('L').value,
                bcsDepartment: row.getCell('M').value,
                jointActivities: row.getCell('N').value,
                train: row.getCell('P').value,
                trainStaff: row.getCell('O').value,
                improve: row.getCell('Q').value,
                trainVmg: row.getCell('U').value,
                loveVmg: row.getCell('R').value,
                disciplineBonus: row.getCell('S').value,
                disciplineViolate: row.getCell('T').value,
                backgroundClass: "success-row"
              }
              this.items.push(mark)
            }
          })
        } catch (Exception) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Vui lòng nhập đúng file theo mẫu'
          })
          this.file = null
        }
        if (this.items.length > 0) {
          this.addStatus = true
        }
      }
      reader.readAsArrayBuffer(event.target.files[0])
    },
    async addMark() {
      const markList = this.items
      this.items = []
      let count = 0;
      let err = 0;
      for (const mark of markList) {
        await ExcelService.addMark(mark).then(response => {
          let newMark = response.data
          newMark.year = mark.year
          newMark.month = mark.month
          this.listMark.push(newMark)
          count++;
          if (this.listMark.length > 0) {
            this.addStatus = false
            this.visibleTable = true
            this.addFileStatus = false

          }
        }).catch(() => {
          err++;
          mark.backgroundClass = "warning-row"

        })
      }
      swal.fire({
        showDenyButton: true,
        icon: 'info',
        title: 'Kết quả thêm điểm',
        text: `Thêm thành công: ${count} dòng. Thất bại: ${err} dòng.`,
        confirmButtonText: 'Oke',
        denyButtonText: `Lưu kết quả`,
      }).then((result) => {
        if (result.isDenied) {
          this.exportResult(markList)
        }
      })

    },
    exportResult(listData) {
      let header = ['STT', 'Mã NHÂN SỰ', 'BỘ PHẬN', 'HỌ VÀ TÊN', 'NĂM', 'THÁNG', 'KPI', 'NVXS THÁNG', 'NVXS QUÝ',
        'NVXS NĂM', 'BỘ PHẬN XS THÁNG', 'BỘ PHẬN XS NĂM', 'BSC BỘ PHẬN', 'HOẠT ĐỘNG CHUNG', 'ĐÀO TẠO GIẢNG VIÊN',
        'THAM GIA ĐÀO TẠO', 'NV ST THÁNG', 'PHÁT TRIỂN VMG', 'I LOVE VMG', 'BONUS', 'PHẠT'];
      let count = 1;
      let workbook = new ExcelJS.Workbook()
      let worksheet = workbook.addWorksheet('VPOINT')
      let headerRow = worksheet.addRow(header)
      headerRow.font = {
        name: 'Time New Roman'
      }
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FFFFFF00'},
          bgColor: {argb: 'FF0000FF'}
        }
        cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}}
      });
      listData.forEach(d => {
        let row = worksheet.addRow([count++, ...Object.values(d)]);
        row.font = {
          color: {
            argb: '00000000',
          },
          bold: false
        }
        if (d.backgroundClass === 'warning-row') {
          row.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'F71616'},
            bgColor: {argb: 'F71616'}
          }

        }
        row.eachCell((cell, index) => {
          if (index > 5 || index === 1) {
            cell.alignment = {
              vertical: 'middle', horizontal: 'center'
            };
          }
          cell.border = {
            top: {
              style: 'thin'
            },
            left: {
              style: 'thin'
            },
            bottom: {
              style: 'thin'
            },
            right: {
              style: 'thin'
            }
          };
        });
      });
      worksheet.getColumn(1).width = 5;
      worksheet.getColumn(2).width = 25;
      worksheet.getColumn(3).width = 25;
      worksheet.getColumn(4).width = 25;
      worksheet.getColumn(5).width = 15;
      worksheet.getColumn(6).width = 15;
      worksheet.getColumn(7).width = 20;
      worksheet.getColumn(8).width = 20;
      worksheet.getColumn(9).width = 20;
      worksheet.getColumn(10).width = 20;
      worksheet.getColumn(11).width = 20;
      worksheet.getColumn(12).width = 20;
      worksheet.getColumn(13).width = 20;
      worksheet.getColumn(14).width = 20;
      worksheet.getColumn(15).width = 20;
      worksheet.getColumn(16).width = 20;
      workbook.xlsx.writeBuffer().then((mark) => {
        let blob = new Blob([mark], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        fs.saveAs(blob, 'result.xlsx');
      });
    }

  },
  mounted() {
    this.items = this.items.map(item => ({...item, isEdit: false}));
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.header-import {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 41px;
  /* identical to box height */

  color: #246CD9;
}

.warning-row {
  background: red;
}

.success-row {
  background: #FFFFFF;
}
</style>
