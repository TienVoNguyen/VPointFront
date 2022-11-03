<template>
  <div class="p-4">
    <div v-if="addFileStatus">
      <h4 class="header-import">Thêm mới dữ liệu tính điểm V-Point bằng cách import file excel</h4>
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
        </el-table-column>
        <el-table-column
            prop="year"
            label="Năm">
          <template v-slot="scope">
            <input type="text" :value="scope.row.year" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="kpi"
            label="KPI">
          <template v-slot="scope">
            <input type="text" :value="scope.row.kpi" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="bestDepartmentMonth"
            label="NVXS Tháng"
            width="70">
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
        </el-table-column>
        <el-table-column
            prop="excellentDepartmentYear"
            label="BPXS Năm"
            width="70">
        </el-table-column>
        <el-table-column
            prop="bcsDepartment"
            label="BSC BP">
          <template v-slot="scope">
            <input type="text" :value="scope.row.bcsDepartment" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="jointActivities"
            label="HDC">
          <template v-slot="scope">
            <input type="text" :value="scope.row.jointActivities" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="train"
            label="TG ĐT">
          <template v-slot="scope">
            <input type="text" :value="scope.row.train" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="trainStaff"
            label="GV ĐT">
          <template v-slot="scope">
            <input type="text" :value="scope.row.trainStaff" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="improve"
            label="Sáng Tạo"
            width="60">
        </el-table-column>
        <el-table-column
            prop="loveVmg"
            label="I Love VMG"
            width="70">
          <template v-slot="scope">
            <input type="text" :value="scope.row.loveVmg" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="trainVmg"
            label="PT VMG">
          <template v-slot="scope">
            <input type="text" :value="scope.row.trainVmg" style="width: 100%; border: none">
          </template>
        </el-table-column>

        <el-table-column
            prop="disciplineBonus"
            label="Thưởng">
          <template v-slot="scope">
            <input type="text" :value="scope.row.disciplineBonus" style="width: 100%; border: none">
          </template>
        </el-table-column>
        <el-table-column
            prop="disciplineViolate"
            label="Phạt">
          <template v-slot="scope">
            <input type="text" :value="scope.row.disciplineViolate" style="width: 100%; border: none">
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="!addFileStatus">
      <el-table
          border
          :data="listMark"
          style="width: 100%">
        <el-table-column
            label="STT"
            width="80">
          <template v-slot="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="staff_id"
            label="Mã nhân viên"
            width="120">
        </el-table-column>
        <el-table-column
            prop="fullName"
            label="Họ tên"
            width="150">
        </el-table-column>
        <el-table-column
            prop="department"
            label="Bộ phận"
            width="120">
        </el-table-column>
        <el-table-column
            prop="month"
            label="Tháng"
            width="120">
        </el-table-column>
        <el-table-column
            prop="year"
            label="Năm"
            width="120">
        </el-table-column>
        <el-table-column
            label="Tổng điểm"
            width="120">
          <template v-slot="scope">
            {{scope.row.pointKPI + scope.row.pointBestDepartmentMonth + scope.row.pointBestDepartmentQuarter + scope.row.pointBestDepartmentYear
                + scope.row.pointBCSDepartment + scope.row.pointJointActivities + scope.row.pointLoveVmg +
                + scope.row.pointTrain + scope.row.pointTrainStaff + scope.row.pointTrainVmg + scope.row.pointImprove
                + scope.row.pointDisciplineBonus + scope.row.pointDisciplineViolate + scope.row.pointExcellentDepartmentMonth
                + scope.row.pointExcellentDepartmentMonth + scope.row.pointExcellentDepartmentYear}}
          </template>
        </el-table-column>
        <el-table-column
            label="Thao tác">
          <template slot-scope="scope">
            <router-link :to="`/admin/AdminSeeDetailVPoint/${scope.row.year}/${scope.row.month}/${scope.row.id}`" style="color: white">
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
import swal from 'sweetalert2'

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
                kpiID: 1,
                bestDepartmentID: 2,
                bestDepartmentMonth: row.getCell('H').value,
                bestDepartmentQuarterID: 16,
                bestDepartmentQuarter: row.getCell('I').value,
                bestDepartmentYearID: 17,
                bestDepartmentYear: row.getCell('J').value,
                excellentDepartmentMonthID: 9,
                excellentDepartmentMonth: row.getCell('K').value,
                excellentDepartmentYearID: 10,
                excellentDepartmentYear: row.getCell('L').value,
                bcsDepartmentID: 3,
                bcsDepartment: row.getCell('M').value,
                jointActivitiesID: 4,
                jointActivities: row.getCell('N').value,

                train: row.getCell('P').value,

                trainStaff: row.getCell('O').value,
                improveID: 6,
                improve: row.getCell('Q').value,
                trainVmgID: 12,
                trainVmg: row.getCell('U').value,
                loveVmgID: 7,
                loveVmg: row.getCell('R').value,
                disciplineBonusID: 13,
                disciplineBonus: row.getCell('S').value,
                disciplineViolateID: 8,
                disciplineViolate: row.getCell('T').value,
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

        console.log(this.items.length)
        if (this.items.length > 0) {
          this.addStatus = true
        }
      }
      reader.readAsArrayBuffer(event.target.files[0])
    },
    exportFile() {
      const mark = [{
        staff_id: 'VMG01',
        department: 'PTPM',
        fullName: 'NTV',
        year: 2022,
        month: 10,
        kpi: 6,
        nvxs: 6,
        bsc: 8,
        hdc: 9,
        dt: 1,
        stt: 3,
        love: 8,
        kyluat: 0,
        tong: 222
      },
        {
          staff_id: 'VMG02',
          department: 'PTPM',
          fullName: 'NTT',
          year: 2022,
          month: 10,
          kpi: 6,
          nvxs: 6,
          bsc: 8,
          hdc: 9,
          dt: 5,
          stt: 3,
          love: 8,
          kyluat: 0,
          tong: 222
        }]
      const title = 'He Thong Quan Ly Diem VPoint';
      const header = ['STT', 'Mã NHÂN SỰ', 'BỘ PHẬN', 'HỌ VÀ TÊN', 'NĂM', 'THÁNG', 'KPI',
        'NVXS, BPXS', 'BSC BỘ PHẬN', 'HOẠT ĐỘNG CHUNG', 'ĐÀO TẠO', 'SÁNG TẠO THÁNG', 'I LOVE VMG', 'KỶ LUẬT', 'TỔNG']
      let workbook = new ExcelJS.Workbook()
      let worksheet = workbook.addWorksheet('VPOINT')
      let titleRow = worksheet.addRow([title])
      titleRow.font = {name: 'Time New Roman', family: 4, size: 16, bold: true}
      worksheet.addRow([])
      const subTitle = ['', '', '', '', '', '', 'HIỆU SUẤT CÔNG VIỆC', '', 'LÀM VIỆC NHÓM', '', 'ĐÀO TẠO',
        'SÁNG TẠO', 'TUÂN THỦ']
      let subtitle = worksheet.addRow(subTitle)
      subtitle.font = {
        name: 'Time New Roman'
      }
      subtitle.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FFFFFF00'},
          bgColor: {argb: 'FF0000FF'}
        }
        cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}}
      });
      let headerRow = worksheet.addRow(header)
      headerRow.font = {
        name: 'Time New Roman'
      }
      worksheet.mergeCells('G3:H3')
      worksheet.mergeCells('I3:J3')
      worksheet.mergeCells('M3:N3')
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FFFFFF00'},
          bgColor: {argb: 'FF0000FF'}
        }
        cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}}
      });
      let count = 1
      mark.forEach(d => {
        let row = worksheet.addRow([count++, ...Object.values(d)]);
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: 'FFFFFFFF'
          }
        };
        row.font = {
          color: {
            argb: '00000000',
          },
          bold: false
        }
        row.eachCell((cell) => {
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
      worksheet.getColumn(2).width = 10;
      worksheet.getColumn(3).width = 15;
      worksheet.getColumn(4).width = 20;
      worksheet.getColumn(5).width = 20;
      worksheet.getColumn(6).width = 20;
      worksheet.getColumn(7).width = 20;
      worksheet.getColumn(8).width = 20;
      worksheet.getColumn(9).width = 20;
      worksheet.getColumn(10).width = 20;
      worksheet.getColumn(11).width = 20;
      worksheet.getColumn(12).width = 20;
      worksheet.getColumn(13).width = 20;
      worksheet.getColumn(14).width = 20;
      worksheet.getColumn(15).width = 20;
      workbook.xlsx.writeBuffer().then((mark) => {
        let blob = new Blob([mark], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        fs.saveAs(blob, 'CarData.xlsx');
      });
    },
    addMark() {
      const markList = this.items
      this.items = []

      markList.forEach(mark => {
        console.log(mark)
        ExcelService.addMark(mark).then(response => {
          console.log(response)
          let newMark = response.data
          newMark.year = mark.year
          newMark.month = mark.month
          this.listMark.push(newMark)
          if (this.listMark.length > 0) {
            this.addStatus = false
            this.visibleTable = true
            this.addFileStatus = false

          }
        }).catch(error => {
          console.log(error)
        })
      })
      swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Thêm điểm thành công'
      })
    },

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