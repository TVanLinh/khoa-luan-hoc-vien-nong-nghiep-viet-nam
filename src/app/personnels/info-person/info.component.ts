import {Component, ElementRef} from "@angular/core";

declare const jQuery: any;

@Component({
  selector: "app-info-personels",
  templateUrl: 'info.component.html',
  styleUrls: ['../form.css', './info.component.css',]
})
export class InfoComponent {
  titleFeature = "Thông tin nhân sự ";

  constructor(protected eleRef: ElementRef) {

  }

  toggleCatalog(target: string) {
    jQuery(this.eleRef.nativeElement).find('#' + target).slideToggle();
  }

  navigate(feture: string) {
    switch (feture) {
      case 'info':
        this.titleFeature = "Thông tin nhân sự ";
        break;
      case 'manager':
        this.titleFeature = "Quản lý tin nhân sự ";
        break;
    }
  }


  print() {
    let mywindow = window.open('', 'print', 'height=100%,width=auto',true);

    mywindow.document.write('<html><head><title>' + 'Thông tin cán bộ ' + '</title>');


    mywindow.document.write(" <link href='/assets/vendors/bootstrap/css/bootstrap.min.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write(" <link href='/assets/vendors/font-awesome-4.7.0/css/font-awesome.min.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write("<link href= '/assets/css/print/cv-print.css' media='all' rel='stylesheet' type='text/css'/>");
    mywindow.document.write('</head><body > <div class="container" ');
    mywindow.document.write('<div class="row">');

    mywindow.document.write('<h3 class="item-title">Sơ yếu lí lịch </h3>');
    mywindow.document.write(jQuery("#cv-print").html());

    mywindow.document.write('<h3 class="item-title">Quá trình hoạt động Đảng, Đoàn, Công Đoàn  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#party-union-info-print").html());
    mywindow.document.write('</div>')

    mywindow.document.write('<h3 class="item-title">Quan hệ gia đình</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#family-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Danh sách hợp đồng lao động</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#contact-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Quá trình công tác</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#process-work-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Trình độ ngoại ngữ </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#foreign-language-print").html());
    mywindow.document.write('</div>');


    mywindow.document.write('<h3 class="item-title">Trình độ tin học</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#info-tech-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Trình độ chính trị</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#politic-rank-print").html());
    mywindow.document.write('</div>');


    mywindow.document.write('<h3 class="item-title">Thông tin khen thưởng  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#bonus-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Thông tin kỷ luật  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#discipline-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Thông tin học hàm  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#academic-rank-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Thông tin danh hiệu nhà giáo  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#title-teacher-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Quá trình giảng dạy  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#process-teaching-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Danh hiệu thi đua </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#emulation-title-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Lịch sử lương </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#salary-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Thông tin quá trình đi nước ngoài</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#foreign-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Thông tin hướn dẫn luận văn/luận án</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#thesis-guide-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Đề tài - dự án khoa học</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#sciece-topic-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">Thông tin báo cáo khoa học</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#seminar-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title"> Thông tin bài báo</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#newspaper-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title"> Quá trình phát minh</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#process-event-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title"> Hoạt động xuất bản</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#publish-info-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title"> Quá trình đào tạo</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#train-print").html());
    mywindow.document.write('</div>');


    mywindow.document.write('</div></div></body></html>');

    mywindow.focus(); // necessary for IE >= 10*/
    setTimeout(() => {
      mywindow.print();
      mywindow.close();
    }, 1000);

  }

}
