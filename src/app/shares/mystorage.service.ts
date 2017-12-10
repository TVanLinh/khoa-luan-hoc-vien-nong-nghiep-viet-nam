export class MystorageService {
  private static ACOUNT = "ACOUNT";

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
}
