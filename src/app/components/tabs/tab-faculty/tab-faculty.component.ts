import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-tab-faculty]',
  templateUrl: './tab-faculty.component.html',
  styleUrls: ['../tabs.component.css','./tab-faculty.component.css']
})
export class TabFacultyComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
