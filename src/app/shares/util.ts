import * as Collections from "typescript-collections";

export class Util {
  static contains(arr: any[], nameAgr: string, value: string) {
    if (!Array.isArray(arr)) {
      return false;
    }
    for (let i of arr) {
      if (i[nameAgr] && ((i[nameAgr] + "").trim().toLowerCase()) == ((value + "").trim().toLowerCase())
        || (i + ''.toLowerCase()).trim() == value.trim().toLowerCase()) {
        return true;
      }
    }
    return false;
  }




  static clone(arry: any[]) {
    let temp = arry.map(item => item);
    let list = new Collections.LinkedList();
    for (let item of temp) {
      list.add(item);
    }
    return list;
  }

  static contains2(arr: any[], nameAgr: string, value: string, nameOther: string) {
    if (!Array.isArray(arr)) {
      return false;
    }
    for (let i of arr) {
      if ((i[nameAgr] && ((i[nameAgr] + "").trim().toLowerCase()) == ((value + "").trim().toLowerCase())
          || (i + ''.toLowerCase()).trim() == value.trim().toLowerCase()) && (( (i + ''.toLowerCase()).trim() != nameOther.trim().toLowerCase()) ||
          ((i[nameAgr] + "").trim().toLowerCase()) != nameOther.trim().toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  static cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  static compareDate(date1: Date, date2: Date) {
    // console.log(JSON.stringify(date1));
    // console.log(JSON.stringify(date2));
    if (date1.getFullYear() > date2.getFullYear()) {
      return 1;
    }
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() > date2.getMonth()) {
      return 1;
    }

    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() > date2.getDate()) {
      return 1;
    }

    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
      return 0;
    }
    return -1;
  }
}
