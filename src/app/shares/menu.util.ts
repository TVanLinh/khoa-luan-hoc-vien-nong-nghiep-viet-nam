import {MenuModel} from "../personnels/model/menu.model";
import {Subject} from "rxjs/Subject";
export class MenuUtil {
  static MENU_INFO_CV = "MENU_INFO_CV";
  static MENU_MANGER_PERSONEL = "MENU_MANGER_PERSONEL";
  static MENU_MANGER_CATALOG = "MENU_MANGER_CATALOG";
  static MENU_MANGER_SYSTEM = "MENU_MANGER_SYSTEM";
  static SEARCH_STATISTIC = "SEARCH_STATISTIC";

  private static menuChange = new Subject<{ type: String, native: boolean }>();
  static $menuChange = MenuUtil.menuChange.asObservable();

  static publishMenu(data: { type: String, native: boolean }) {
    this.menuChange.next(data);
  }

  static isLogin = false;

  private static menuApp: MenuModel[]  = [
  {
    href: "/manager/info", title: 'My CV'
  }, {
    href: "/manager/manager-personnel", title: 'Quản lý nhân sự '
  }, {
    href: "/manager/search-statistic", title: 'Tìm kiếm thống kê '
  }, {
    href: "/manager/manager-system", title: 'Quản trị hệ thống '
  }, {
    href: "/manager/manager-catalog", title: 'Danh mục '
  }
];

  private static menuFeatureInfo: MenuModel[] = [
    {href: '#app-curriculum-vitae', title: 'Sơ yếu lí lịch '},
    {href: '#app-party-union', title: 'Đảng - Đoàn - Công Đoàn - Quân ngũ  '},
    {href: '#app-family-relationship', title: 'Quan hệ gia đình '},
    {href: '#app-contract', title: 'Hợp đồng lao động '},
    {href: '#app-process-work', title: 'Quá trình công tác '},
    {href: '#app-politic-language-technology', title: 'Trình độ chính trị - Tin học- Ngoại ngữ  '},
    {href: '#app-bonus-discipline', title: 'Khen thưởng kỷ luật '},
    {href: '#app-academic-rank', title: 'Học hàm -  Danh hiệu nhà giáo '},
    {href: '#app-process-teaching', title: 'Quá trình giảng dạy  '},
    {href: '#app-emulation-title', title: 'Danh hiệu thi đua '},
    {href: '#app-salary-brief', title: 'Lịch sử lương  '},
    {href: '#app-foreign', title: 'Đi nước ngoài '},
    {href: '#app-thesis-guide', title: 'Hướng dẫn luận văn/luận án  '},
    {href: '#app-science-topic', title: 'Đề tài - dự án khoa học '},
    {href: '#app-senimar-newpaper', title: 'Bài báo - báo cáo khoa học '},
    {href: '#app-process-evention', title: 'Phát minh/sáng chế  '},
    {href: '#app-publish-info', title: 'Họat động xuất bản '},
    {href: '#app-train', title: 'Quá trình đào tạo  '}
  ];

  private static menuManagerPerson: MenuModel[] = [
    {href: '/manager/manager-personnel/add-personnel', title: 'Thêm mới cập nhật hồ sơ'},
    {href: '/manager/manager-personnel/edit-personnel', title: 'Chỉnh sửa thông tin cán bộ '},
    {href: '/manager/manager-personnel/procedure-leave-job', title: 'Làm thủ tục nghỉ việc  '},
    {href: '/manager/manager-personnel/procedure-bind-job', title: 'Làm thủ tục buộc thôi việc  '},
    {href: '/manager/manager-personnel/procedure-transfer-unit-work', title: 'Chuyển đơn vị công tác  '},
    {href: '/manager/manager-personnel/procedure-transfer-department', title: 'Chuyển phòng ban  '},
    {href: '/manager/manager-personnel/procedure-retire', title: 'Làm thủ tục về hưu   '},
    {href: '/manager/manager-personnel/chuaco----', title: 'Xét lên lương '}
  ];

  public static  getMenuApp(): MenuModel[] {
    return this.menuApp;
  }


  public static  getMenuManagerPerson() {
    return this.menuManagerPerson;
  }

  public static  getMenuFeatureInfo() {
    return this.menuFeatureInfo;
  }

  private  static  menuCatalog:MenuModel[]= [
    {title:"Danh mục khoa, phòng ban ",href :"/manager/manager-catalog/faculty"},
    {title:"Danh mục  học hàm ",href :"/manager/manager-catalog/academic"},
    {title:"Danh mục  ngạch công chức  ",href :"/manager/manager-catalog/rank-officer"},
    {title:"Danh mục  chức vụ  ",href :"/manager/manager-catalog/position"},
  ];

  public static  getMenuCatalog() {
    return this.menuCatalog;
  }

  private static searchStatistic: MenuModel[] = [
    {title:"Tìm kiếm ",href :"/manager/search-statistic/search"},
    {title:"Thống kê ",href :"/manager/search-statistic/statistic"},
  ];

  public static  getMenuSearchStatistic () {
    return this.searchStatistic;
  }
}
