import { KhoaLuanHocVienNongNghiepVietNamPage } from './app.po';

describe('khoa-luan-hoc-vien-nong-nghiep-viet-nam App', () => {
  let page: KhoaLuanHocVienNongNghiepVietNamPage;

  beforeEach(() => {
    page = new KhoaLuanHocVienNongNghiepVietNamPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
