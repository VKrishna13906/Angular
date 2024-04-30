import { Injectable } from '@angular/core';
// import * as Excel from "exceljs";
import * as Excel from 'exceljs/dist/exceljs.min.js'
import * as fs from 'file-saver';
import { DefaultCompanyLogoBs64 } from '../../validation';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  myDate = new Date();
  todaysDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
  constructor(private datePipe: DatePipe) {
  }
  generateMultipleTabInOneExcelSheet(ExcelWorkbookName, ReportMainHeading, MainHeading, ExcelName: any[], ExcelHeader: any[], ExcelData: any[]) {
    //var Excel = require('exceljs');
    let workbook = new Excel.Workbook();
    let worksheet;

    ////////
    worksheet = workbook.addWorksheet(
      ExcelWorkbookName,
      {
        properties:
        {
          tabColor: { argb: '4285f4' }
        },
        views: [
          {
            showGridLines: true
          }
        ]
      })

    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);

    let logo = workbook.addImage({
      base64: DefaultCompanyLogoBs64,
      extension: 'png',
    });
    
      worksheet.addImage(logo, 'A2:B5');
    

    worksheet.addRow([]);
    //////
    let test: any = [ReportMainHeading]
    let ReportHeading = worksheet.addRow(test);
    ReportHeading.font = { bold: true, size: 14 }
    worksheet.addRow([]);

    for (let j = 0; j < MainHeading.length; j++) {
      //let  mainheading:any[]=[MainHeading[j]];
      let headingRow = worksheet.addRow(MainHeading[j]);
      headingRow.font = { bold: true };

    }

    for (let i = 0; i < ExcelName.length; i++) {
      worksheet.addRow([]);
      let heading: any[] = [ExcelName[i]];
      let headingRow = worksheet.addRow(heading);
      headingRow.font = { bold: true };
      worksheet.addRow([]);
      let headerRow = worksheet.addRow(ExcelHeader[i]);

      headerRow.font = {
        //name: 'Calibri',
        //size: 16,
        //underline: 'single',
        bold: true,
        color: { argb: 'ffffff' }
      }

      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '6d6e72' },
          //bgColor: { argb: 'ffffff' }
        }

        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      });

      ExcelData[i].map(arr => {

        if ((arr[arr.length - 1]) === "Total") {
          arr.pop();
          let totalRow = worksheet.addRow(arr);

          totalRow.eachCell((cell, number) => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'e8f0fd' },
              //color: { argb: 'ffffff' }
            },
              cell.font = { bold: true }

            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
          });
        }
        else {
          let DataRow = worksheet.addRow(arr);
          //DataRow.eachCell((cell, number) => {
          //  cell.border = {
          //    top: { style: 'thin', color: {argb:'cccccc'}},
          //    left: { style: 'thin', color: {argb:'cccccc'}},
          //    bottom: { style: 'thin', color: {argb:'cccccc'}},
          //    right: { style: 'thin', color: {argb:'cccccc'}}
          //  }
          //});
        }
      });

      worksheet.getColumn(2).width = 15;
      worksheet.getColumn(3).width = 15;
      worksheet.getColumn(4).width = 18;
      worksheet.getColumn(5).width = 35;
      worksheet.getColumn(6).width = 25;
      worksheet.getColumn(7).width = 25;
      worksheet.getColumn(8).width = 25;
      worksheet.getColumn(9).width = 15;
      worksheet.getColumn(10).width = 15;

      worksheet.addRow([]);
    }

    // let desclaimer: any[] = ['Disclaimer :'];
    // let bottomRow = worksheet.addRow(desclaimer);
    // bottomRow.font = { bold: true };

    // let desclaimer1: any[] = ['This statement is based on the information made available to us by the Asset Management Companies (AMC).'];
    // let desclaimer2: any[] = ['To that extent, there may be a delay in updating the latest values in this statement in case of delay in receipt of data from the AMCs.'];
    // let desclaimer3: any[] = ['Hence, the statement from the respective AMC should reflect the exact information for the respective folio. Any discrepancy in the above statement should be reported to us.'];
    // let desclaimer4: any[] = ['The tax calculations are made based on our interpretation of the Income tax Act. Please contact your Accountant/Tax consultant for the exact calculations. Maturity Date, where displayed is based on available information.'];
    // let bottomRow1 = worksheet.addRow(desclaimer1);
    // let bottomRow2 = worksheet.addRow(desclaimer2);
    // let bottomRow3 = worksheet.addRow(desclaimer3);
    // let bottomRow4 = worksheet.addRow(desclaimer4);
    // bottomRow1.font = { bold: true };
    // bottomRow2.font = { bold: true };
    // bottomRow3.font = { bold: true };
    // bottomRow4.font = { bold: true };

    workbook.xlsx.writeBuffer().then((ExcelData) => {
      let blob = new Blob([ExcelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${ExcelWorkbookName}.xlsx`);
    })
  }

}
