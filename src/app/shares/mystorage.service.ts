export class MystorageService {
  private static ACOUNT = "ACOUNT";
  private static AVATAR = "AVATAR";

  public static saveAcount(data) {
    localStorage.setItem(MystorageService.ACOUNT, (JSON.stringify(data)));
  }

  public static getAcount() {
    return JSON.parse((localStorage.getItem(MystorageService.ACOUNT)));
  }

  public static removeAcount() {
    localStorage.clear();

    // localStorage.removeItem(MystorageService.ACOUNT);
  }

static  saveAvatar(value) {
    localStorage.setItem(MystorageService.AVATAR, value);
  }

static  getAvatar() {
    return localStorage.getItem(MystorageService.AVATAR);
  }
}
