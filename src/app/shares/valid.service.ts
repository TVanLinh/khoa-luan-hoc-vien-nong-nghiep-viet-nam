export class ValidService {

  static isNotBlank(str: string) {
    return !(str == 'undefine' || str == null || (str + "").trim() == "");
  }

  static validEmail(email: string) {
    let pattern = /^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    return pattern.test(email);
  }

  static validPhone(phone: string) {
    let pattern = /(^[0-9]*)$/;
    return pattern.test(phone);
  }


  static isNotBlanks(strs: any[]) {
    if (!Array.isArray(strs)) {
      return false;
    }

    for (let item of strs) {
      console.log("item " + item);
      if (!ValidService.isNotBlank(item)) {
        console.log("item " + item);
        return false;
      }
    }

    return true;
  }
}
