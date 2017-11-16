export class Config {
  public static HOST_SERVER = "http://localhost:3000";
  public static CV_URL = Config.HOST_SERVER + "/info/cv";
  public static ARMYPUG_URL = Config.HOST_SERVER + "/info/armypug";
  public static FAMILY_URL = Config.HOST_SERVER + "/info/family";
  public static CONTRACT_URL = Config.HOST_SERVER + "/info/contract";
  public static CONTRACT_FOREIGN = Config.HOST_SERVER + "/info/foreignlanguage";
  public static CONTRACT_POLITIC = Config.HOST_SERVER + "/info/politic";
  public static INFO_TECH = Config.HOST_SERVER + "/info/infotechnology";
  public static PATERN_DATE = "^(0?[1-9]|[1-2][0-9]|3[0-1])/(0?[1-9]|1[012])/d{4}$";
}

export declare const jQuery: any;
