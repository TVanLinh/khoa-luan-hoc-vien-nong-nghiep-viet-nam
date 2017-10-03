import {MenuModel} from "../personnels/model/menu.model";
export class MenuUtil {
  private static menuApp: MenuModel[] = [
    {href: '', title: 'Quản lý nhân sự'},
    {href: '', title: 'Quản lý nhân sự 1'},
    {href: '', title: 'Quản lý nhân sự 2'},
    {href: '', title: 'Quản lý nhân sự 3' },
    {href: '', title: 'Quản lý nhân sự 4'},
  ];

  // private static menuFeaturePerson: MenuModel[] = [
  //   {href: '#app-curriculum-vitae', title: 'Sơ yếu lí lịch '},
  //   {href: '#app-party-union', title: 'Đảng - Đoàn - Công Đoàn - Quân ngũ  '},
  //   {href: '#app-family-relationship', title: 'Quan hệ gia đình '},
  //   {href: '#app-contract', title: 'Hợp đồng lao động '},
  //   {href: '#app-process-work', title: 'Quá trình công tác '},
  //   {href: '#app-politic-language-technology', title: 'Trình độ chính trị - Tin học- Ngoại ngữ  '},
  //   {href: '#app-bonus-discipline', title: 'Khen thưởng kỷ luật '},
  //   {href: '#app-academic-rank', title: 'Học hàm -  Danh hiệu nhà giáo '},
  //   {href: '#app-process-work', title: 'Quá trình công tác '},
  //   {href: '#app-emulation-title', title: 'Danh hiệu thi đua '},
  //   {href: '#app-salary-brief', title: 'Lịch sử lương  '},
  //   {href: '#app-foreign', title: 'Đi nước ngoài '},
  //   {href: '#app-thesis-guide', title: 'Hướng dẫn luận văn/luận án  '},
  //   {href: '#', title: 'Đề tài - dự án khoa học '},
  //   {href: '#app-senimar-newpaper', title: 'Bài báo - báo cáo khoa học '},
  //   {href: '#app-process-evention', title: 'Phát minh/sáng chế  '},
  //   {href: '#app-publish-info', title: 'Họat động xuất bản '},
  //   {href: '#app-science-topic', title: 'Đề tài - dự án khoa học '},
  //   {href: '#', title: 'Hoạt động xã hội - nghề nghiệp '},
  //   {href: '#', title: 'Giải thưởng  '},
  //   {href: '#', title: 'Giải thưởng  '}
  // ];

  private static menuFeaturePerson: MenuModel[] = [
    {href: 'curriculum-vitae', title: 'Sơ yếu lí lịch '},
    {href: 'party-union', title: 'Đảng - Đoàn - Công Đoàn - Quân ngũ  '},
    {href: 'family-relationship', title: 'Quan hệ gia đình '},
    {href: 'contract', title: 'Hợp đồng lao động '},
    {href: 'process-work', title: 'Quá trình công tác '},
    {href: 'politic-language-technology', title: 'Trình độ chính trị - Tin học- Ngoại ngữ  '},
    {href: 'bonus-discipline', title: 'Khen thưởng kỷ luật '},
    {href: 'academic-rank', title: 'Học hàm -  Danh hiệu nhà giáo '},
    {href: 'emulation-title', title: 'Danh hiệu thi đua '},
    {href: 'salary-brief', title: 'Lịch sử lương  '},
    {href: 'foreign', title: 'Đi nước ngoài '},
    {href: 'thesis-guide', title: 'Hướng dẫn luận văn/luận án  '},
    {href: 'senimar-newpaper', title: 'Bài báo - báo cáo khoa học '},
    {href: 'process-evention', title: 'Phát minh/sáng chế  '},
    {href: 'publish-info', title: 'Họat động xuất bản '},
    {href: 'science-topic', title: 'Đề tài - dự án khoa học '},
    {href: 'process-train', title: 'Quá trình đào tạo  '},
    {href: 'process-teaching', title: 'Quá trình giảng dạy   '},
    {href: '#', title: 'Hoạt động xã hội - nghề nghiệp '},
    {href: '#', title: 'Giải thưởng  '}
  ];

  private  static  menuManagerPerson:MenuModel[] = [
    {href: 'add-personnel', title: 'Thêm mới cập nhật hồ sơ'},
    {href: 'edit-personnel', title: 'Chỉnh sửa thông tin cán bộ '},
    {href: 'procedure-leave-job', title: 'Làm thủ tục nghỉ việc  '},
    {href: 'procedure-bind-job', title: 'Làm thủ tục buộc thôi việc  '},
    {href: 'procedure-transfer-unit-work', title: 'Chuyển đơn vị công tác  '},
    {href: 'procedure-transfer-department', title: 'Chuyển phòng ban  '},
    {href: 'procedure-retire', title: 'Làm thủ tục về hưu   '},
    {href: 'chuaco----', title: 'Xét lên lương '}
  ];

  public static  getMenuApp(): MenuModel[] {
    return this.menuApp;
  }

  public  static getMenuFeaturePerson(): MenuModel[] {
    return this.menuFeaturePerson;
  }

  public static  getMenuManagerPerson() {
    return this.menuManagerPerson;
  }
}
