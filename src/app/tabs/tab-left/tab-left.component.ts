import {Component, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;
@Component({
  selector: '[app-tab-left]',
  templateUrl: './tab-left.component.html',
  styleUrls: ['../tabs.component.css']
})
export class TabLeftComponent implements OnInit {
  faculty =[
    {href: "", name: "Khoa Chăn nuôi"},
    {href: "", name: "Khoa công nghệ thực phẩm",},
    {href: "", name: "Khoa Cơ điện"},
    {href: "", name: "Khoa Công nghệ sinh học"},
    {href: "", name: "Khoa Giáo dục quốc phòng"},
    {href: "", name: "Khoa Kinh tế và Phát triển nông thôn"},
    {href: "", name: "Khoa Lý luận chính trị và Xã hội"},
    {href: "", name: "Khoa Môi trường"},
    {href: "", name: " Khoa Nông học"},
    {href: "", name: " Khoa Quản lý đất đai"},
    {href: "", name: " Khoa Thú y"},
    {href: "", name: "   Khoa Thủy sản"},
  ];

  departments = [
    {href: "", name: "Khoa Chăn nuôi"},
    {href: "", name: "Khoa công nghệ thực phẩm",},
    {href: "", name: "Khoa Cơ điện"},
    {href: "", name: "Khoa Công nghệ sinh học"},
    {href: "", name: "Khoa Giáo dục quốc phòng"},
    {href: "", name: "Khoa Kinh tế và Phát triển nông thôn"},
    {href: "", name: "Khoa Lý luận chính trị và Xã hội"},
    {href: "", name: "Khoa Môi trường"},
    {href: "", name: " Khoa Nông học"},
    {href: "", name: " Khoa Quản lý đất đai"},
    {href: "", name: " Khoa Thú y"},
    {href: "", name: "   Khoa Thủy sản"},
  ];

  constructor(private _eref: ElementRef) {
  }

  toggleTab(): void {
    jQuery(this._eref.nativeElement).find('.icon-tab-open').toggleClass('dp-none');
    jQuery(this._eref.nativeElement).find('.tab-left').toggleClass('tab-left-toggle');
  }

  ngOnInit() {
  }

}
