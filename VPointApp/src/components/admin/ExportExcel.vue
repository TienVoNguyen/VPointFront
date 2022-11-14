<template>
  <el-container>
    <el-header class="mt-4 h-100">
      <h2 class="vpointheader">Xuất dữ liệu điểm V-Point</h2>
      <div class="d-flex mt-4 justify-content-center" style="align-items: baseline;">
        <div class="text-left  d-inline-block">
          <p style="color: #6c757d"> Bộ phận:
            <span style="">
                    <select class="form-control" v-model="department"
                            style="width: 120px; display: inherit; align-items: center;">
                      <option value="">Tất cả</option>
                      <option v-for="(department, index) in departmentData" :key="index">
                         {{ department.name }}
                      </option>
                    </select>
                  </span>
          </p>
        </div>
        <p class="d-inline-block ml-4" style="color: #6c757d; margin-bottom: 2rem"> Tháng:
          <span>
                  <select class="form-control" v-model="month"
                          style="width: 100px; display: inherit; align-items: center">
                    <option v-for="m in monthData" :key="m">
                      {{ m }}
                    </option>
                  </select>
                </span>
        </p>
        <p class="d-inline-block ml-4" style="color: #6c757d; margin-bottom: 2rem"> Năm:
          <span>
                  <select class="form-control" v-model="year"
                          style="width: 100px; display: inherit; align-items: center">
                    <option v-for="y in yearData" :key="y">
                      {{ y }}
                    </option>
                  </select>
                </span>
        </p>
        <p class="d-inline-block ml-4" style="color: #6c757d; ">
          <el-button round @click="getParams">Tìm kiếm</el-button>
        </p>
      </div>
    </el-header>
    <el-main>
      <div class="mb-4 text-right">
        <el-button type="primary" plain round @click="exportTotal">Xuất tổng điểm</el-button>
        <el-button type="success" plain round @click="exportDetail">Xuất chi tiết điểm</el-button>
      </div>

      <el-table border
                :data="allMark"
                style="width: 100%"
                height="430">
        <el-table-column
            align="center"
            label="STT"
            width="70">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
            prop="staffId"
            label="Mã nhân viên"
            width="150">
        </el-table-column>
        <el-table-column
            prop="fullName"
            label="Họ và tên"
            width="280">
        </el-table-column>
        <el-table-column
            prop="department"
            label="Phòng ban"
            width="190">
        </el-table-column>
        <el-table-column
            vertical-align="middle"
            align="center"
            width="100"
            label="V-point">
          <template v-slot="scope">
            {{ scope.row.total !== null ? scope.row.total : 0 }}
          </template>
        </el-table-column>
        <el-table-column
            label="I. Hiệu suất công việc">
          <el-table-column
              vertical-align="middle"
              align="center"
              label="KPI"
              width="70">
            <template v-slot="scope">
              {{ scope.row.kpi !== null ? scope.row.kpi : 0 }}
            </template>
          </el-table-column>
          <el-table-column
              vertical-align="middle"
              align="center"
              label="NVXS BPXS"
              width="70">
            <template v-slot="scope">
              {{ scope.row.excellentStaffAndDepartment !== null ? scope.row.excellentStaffAndDepartment : 0 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="II. Làm việc nhóm">
          <el-table-column
              vertical-align="middle"
              align="center"
              label="BSC Bộ phận"
              width="75">
            <template v-slot="scope">
              {{ scope.row.bsc !== null ? scope.row.bsc : 0 }}
            </template>
          </el-table-column>
          <el-table-column
              vertical-align="middle"
              align="center"
              prop="jointActivities"
              label="HDC"
              width="70">
            <template v-slot="scope">
              {{ scope.row.jointActivities !== null ? scope.row.jointActivities : 0 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="III. Đào tạo">
          <el-table-column
              vertical-align="middle"
              align="center"
              label="Đào tạo"
              width="75">
            <template v-slot="scope">
              {{ scope.row.train !== null ? scope.row.train : 0 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="IV. Sáng tạo">
          <el-table-column
              vertical-align="middle"
              align="center"
              label="Sáng tạo"
              width="100">
            <template v-slot="scope">
              {{ scope.row.improve !== null ? scope.row.improve : 0 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="V. Tuân thủ"
            vertical-align="middle"
            align="center">
          <el-table-column
              vertical-align="middle"
              align="center"
              label="I Love VMG"
              width="70">
            <template v-slot="scope">
              {{ scope.row.loveVMG !== null ? scope.row.loveVMG : 0 }}
            </template>
          </el-table-column>
          <el-table-column
              vertical-align="middle"
              align="center"
              label="Bonus"
              width="75">
            <template v-slot="scope">
              {{ scope.row.bonus !== null ? scope.row.bonus : 0 }}
            </template>
          </el-table-column>
          <el-table-column
              vertical-align="middle"
              align="center"
              label="Kỷ luật"
              width="70">
            <template v-slot="scope">
              {{ scope.row.discipline !== null ? scope.row.discipline : 0 }}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import MarkService from "@/service/mark-service";
import authService from "@/service/auth-service";
import ExcelJS from "exceljs";
import * as fs from 'file-saver';

export default {
  name: "ExportExcel",
  data() {
    return {
      allMark: [],
      month: '',
      monthData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year: '',
      yearData: '',
      department: '',
      departmentData: ''
    }
  },
  methods: {
    exportTotal() {
      let data = [];
      let header = ['STT', 'Mã NHÂN SỰ', 'BỘ PHẬN', 'HỌ VÀ TÊN', 'NĂM', 'THÁNG', 'Tổng điểm'];
      this.allMark.forEach(mark => {
        let newMark = {
          staffId: mark.staffId,
          department: mark.department,
          fullName: mark.fullName,
          month: mark.month,
          year: mark.year,
          total: mark.total !== null ? mark.total : 0
        }
        data.push(newMark)
      })

      this.exportFile(header, null, data);
    },
    exportDetail() {
      const header = ['STT', 'MÃ NHÂN SỰ', 'BỘ PHẬN', 'HỌ VÀ TÊN', 'NĂM', 'THÁNG', 'TỔNG ĐIỂM', 'KPI',
        'NVXS, BPXS', 'BSC BỘ PHẬN', 'HOẠT ĐỘNG CHUNG', 'ĐÀO TẠO', 'SÁNG TẠO THÁNG', 'I LOVE VMG', 'BONUS', 'KỶ LUẬT']
      const subTitle = ['', '', '', '', '', '', '', 'HIỆU SUẤT CÔNG VIỆC', '', 'LÀM VIỆC NHÓM', '', 'ĐÀO TẠO',
        'SÁNG TẠO', 'TUÂN THỦ']
      let data = [];
      this.allMark.forEach(mark => {
        let newMark = {
          staffId: mark.staffId,
          department: mark.department,
          fullName: mark.fullName,
          month: mark.month,
          year: mark.year,
          total: mark.total !== null ? mark.total : 0,
          kpi: mark.kpi !== null ? mark.kpi : 0,
          excellentStaffAndDepartment: mark.excellentStaffAndDepartment !== null ? mark.excellentStaffAndDepartment : 0,
          bsc: mark.bsc !== null ? mark.bsc : 0,
          jointActivities: mark.jointActivities !== null ? mark.jointActivities : 0,
          train: mark.train !== null ? mark.train : 0,
          improve: mark.improve !== null ? mark.improve : 0,
          loveVMG: mark.loveVMG !== null ? mark.loveVMG : 0,
          bonus: mark.bonus !== null ? mark.bonus : 0,
          discipline: mark.discipline !== null ? mark.discipline : 0,
        }
        data.push(newMark)
      })
      this.exportFile(header, subTitle, data)
    },
    exportFile(header, subTitle, data) {
      const title = `Danh sách Điểm VPoint Tháng ${data[0].month} Năm ${data[0].year}`;

      let workbook = new ExcelJS.Workbook()
      let worksheet = workbook.addWorksheet('VPOINT')
      let titleRow = worksheet.addRow([title])
      titleRow.font = {name: 'Time New Roman', family: 4, size: 16, bold: true}
      worksheet.addRow([])
      if (subTitle) {
        let subtitle = worksheet.addRow(subTitle)
        subtitle.font = {
          name: 'Time New Roman'
        }
        subtitle.eachCell((cell) => {
          cell.alignment = {
            vertical: 'middle', horizontal: 'center'
          };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'FFFFFF00'},
            bgColor: {argb: 'FF0000FF'}
          }
          cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}}
        });
        worksheet.mergeCells('H3:I3')
        worksheet.mergeCells('J3:K3')
        worksheet.mergeCells('N3:P3')
      }
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
      let count = 1
      data.forEach(d => {
        let row = worksheet.addRow([count++, ...Object.values(d)]);
        row.font = {
          color: {
            argb: '00000000',
          },
          bold: false
        }
        row.eachCell((cell, index) => {
          if ( index > 5 || index === 1) {
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
        fs.saveAs(blob, 'VPoint.xlsx');
      });
    },
    getParams() {
      let params = {
        month: this.month,
        year: this.year,
        department: this.department
      }
      MarkService.getAllMark(params).then(response => {
        this.allMark = response.data
      })
    }
  },
  created() {
    MarkService.getAllMark().then(response => {
      this.allMark = response.data
      this.month = this.allMark[0].month
      this.year = this.allMark[0].year
    })
    authService.getAllDepartment().then(response => {
      this.departmentData = response.data
    })
    MarkService.getAllYear().then(response => {
      this.yearData = response.data
    })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.vpointheader {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 41px;
  /* identical to box height */


  /* Xanhhhh */

  color: #246CD9;
}
</style>
