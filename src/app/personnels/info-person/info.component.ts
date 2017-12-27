import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MystorageService} from "../../shares/mystorage.service";
import {MenuUtil} from "../../shares/menu.util";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../shares/task.service";
import {Config} from "../../shares/config";
import {BaseFormComponent} from "../base-form.component";

declare const jQuery: any;

@Component({
  selector: "app-info-personels",
  templateUrl: 'info.component.html',
  styleUrls: ['../form.css', './info.component.css',]
})
export class InfoComponent extends BaseFormComponent  implements OnInit {


  titleFeature = "Thông tin nhân sự ";
  @Input() showAcitve = false;
  @Input() showCancel = false;
  menu = [];
  @Input() user: any = MystorageService.getAcount()['user'];
  @Input() menuShow = false;
  @Output() onAccept = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  @Input() editEnable: boolean = false;

  constructor(public taskService: TaskService, protected eleRef: ElementRef, public activateRouter: ActivatedRoute) {
    super(eleRef, taskService);
    this.user = MystorageService.getAcount()['user'];
  }

  ngOnInit(): void {
    this.menu = MenuUtil.getMenuFeatureInfo();
    console.log(this.activateRouter.queryParams.subscribe(data => {
      if (data['user']) {
        let usertemp = localStorage.getItem("USER_TEMP");
        this.user = usertemp ? JSON.parse(usertemp) : null;
        this.showAcitve = true;
      }
    }));

    if (this.user) {
      this.taskService.get(Config.INFO_URL + "/accept?username=" + this.user.username).subscribe(data => {
        // console.log(JSON.stringify(data));
        if (!data || data && !data['accept']) {
          this.editEnable = true;
        }
      }, err => {
        this.editEnable = false;
      });
    }

    // this.user = MystorageService.getAcount()['user'];
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

  onAcceptShare() {
    console.log(JSON.stringify(this.user));
    if (this.user) {
      this.taskService.put(Config.CV_URL_ACCEPT, {username: this.user.username}).subscribe((data) => {
        console.log("ok");
        this.updateMessge("Duyệt thành công", 'success');
        this.onAccept.emit(true);
      }, err => {
        this.updateMessge("Duyệt không thành công", 'warning');
        this.onAccept.emit(false);
      });
    }
  }

  onCancelShare() {
    this.onCancel.emit(true);
  }

  print() {
    let mywindow = window.open('', "newWin", "width=" + screen.availWidth + ",height=" + screen.availHeight, true);

    mywindow.document.write('<html><head><title>' + 'Thông tin cán bộ ' + '</title>');


    mywindow.document.write(" <link href='/assets/vendors/bootstrap/css/bootstrap.min.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write(" <link href='/assets/vendors/font-awesome-4.7.0/css/font-awesome.min.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write("<link href= '/assets/css/print/cv-print.css' media='all' rel='stylesheet' type='text/css'/>");
    mywindow.document.write('</head><body > <div class="container" ');
    mywindow.document.write('<div class="row">');

    mywindow.document.write('<h3 class="item-title">1.Sơ yếu lí lịch </h3>');
    mywindow.document.write(jQuery("#cv-print").html());

    mywindow.document.write('<h3 class="item-title">2. Quá trình hoạt động Đảng, Đoàn, Công Đoàn, Quân ngũ  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#party-union-info-print").html());
    mywindow.document.write('</div>')

    mywindow.document.write('<h3 class="item-title">3. Quan hệ gia đình</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#family-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">4. Danh sách hợp đồng lao động</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#contact-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">5. Quá trình công tác</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#process-work-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">6. Trình độ ngoại ngữ </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#foreign-language-print").html());
    mywindow.document.write('</div>');


    mywindow.document.write('<h3 class="item-title">7. Trình độ tin học</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#info-tech-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">8. Trình độ chính trị</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#politic-rank-print").html());
    mywindow.document.write('</div>');


    mywindow.document.write('<h3 class="item-title">9. Thông tin khen thưởng  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#bonus-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">10. Thông tin kỷ luật  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#discipline-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">11. Thông tin học hàm  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#academic-rank-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">12. Thông tin danh hiệu nhà giáo  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#title-teacher-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">13. Quá trình giảng dạy  </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#process-teaching-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">14. Danh hiệu thi đua </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#emulation-title-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">15. Lịch sử lương </h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#salary-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">16. Thông tin quá trình đi nước ngoài</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#foreign-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">17. Thông tin hướn dẫn luận văn/luận án</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#thesis-guide-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">18. Đề tài - dự án khoa học</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#sciece-topic-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">19. Thông tin báo cáo khoa học</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#seminar-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">20. Thông tin bài báo</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#newspaper-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">21. Quá trình phát minh</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#process-event-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">22. Hoạt động xuất bản</h3>');
    mywindow.document.write('<div class="col-xs-12">');
    mywindow.document.write(jQuery("#publish-info-print").html());
    mywindow.document.write('</div>');

    mywindow.document.write('<h3 class="item-title">23. Quá trình đào tạo</h3>');
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
