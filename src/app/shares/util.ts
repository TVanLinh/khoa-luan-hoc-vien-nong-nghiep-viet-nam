import * as Collections from "typescript-collections";

export class Util {
  static contains(arr: any[], nameAgr: string, value: string) {
    if (!Array.isArray(arr)) {
      return false;
    }
    for (let i of arr) {
      if (i[nameAgr] && ((i[nameAgr] + "").trim().toLowerCase()) == ((value + "").trim().toLowerCase())) {
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
}
