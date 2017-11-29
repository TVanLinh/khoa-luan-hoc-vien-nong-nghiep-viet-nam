import {Angular2Csv} from "angular2-csv/Angular2-csv";

export class ExcelService {
  export(fileName, title, data: any[]) {
    let array: any[] = [];
    array.push(title);
    for (let item of data) {
      array.push(item);
    }
    new Angular2Csv(array, fileName);
  }
}
