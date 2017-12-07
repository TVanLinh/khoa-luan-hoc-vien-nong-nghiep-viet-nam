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
    let mywindow = window.open('', 'Print', 'height=100%,width=auto');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');


    mywindow.document.write(" <link href=\"/assets/vendors/bootstrap/css/bootstrap.min.css\" type=\"text/css\" rel=\"stylesheet\"/>");
    mywindow.document.write(" <link href=\"/assets/vendors/font-awesome-4.7.0/css/font-awesome.min.css\" type=\"text/css\" rel=\"stylesheet\"/>");
    mywindow.document.write("<link href='/assets/css/core/helper_class_main.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write("<link href='/assets/css/core/helper_class_i.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write("<link href='/assets/css/core/helper_class2.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write("<link href='/assets/css/core/color.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write("<link href='/assets/css/main.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write("<link href= '/assets/css/print/print.css' media='all' rel='stylesheet' type='text/css'/>");
    mywindow.document.write("<link href= '/assets/css/print/cv-print.css' media='all' rel='stylesheet' type='text/css'/>");
    mywindow.document.write('</head><body > <div class="container" style="width: 1200px">');
    mywindow.document.write(jQuery("#info-container").html());
    mywindow.document.write('</div></body></html>');

    mywindow.focus(); // necessary for IE >= 10*/
    setTimeout(() => {
      mywindow.print();
      mywindow.close();
    }, 1000);

  }

}
