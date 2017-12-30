import { Component, OnInit } from '@angular/core';
import {until} from "selenium-webdriver";
import titleContains = until.titleContains;

@Component({
  selector: '[app-new]',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  listNews=[{
      href:"",
      imgPath:"../../assets/images/tintuc/tintuc1.png",
      content:" Giáo dục đại học định hướng nghề nghiệp ứng dụng (POHE) tập trung vào việc đào tạo sinh viên có khả năng đáp..."
   },
    {
      href:"",
      imgPath:"../../assets/images/tintuc/tintuc2.png",
      content:" Giáo dục đại học định hướng nghề nghiệp ứng dụng (POHE) tập trung vào việc đào tạo sinh viên có khả năng đáp..."
    },
    {
      href:"",
      imgPath:"../../assets/images/tintuc/tintuc3.png",
      content:" Giáo dục đại học định hướng nghề nghiệp ứng dụng (POHE) tập trung vào việc đào tạo sinh viên có khả năng đáp..."
    }
  ];

  listNews2=[
        { title:"Tăng cường hợp tác với các trường đại học úc..."},
        { title:"Tăng cường hợp tác với các trường đại học úc..."},
        { title:"Tăng cường hợp tác với các trường đại học úc..."},
        { title:"Tăng cường hợp tác với các trường đại học úc..."},
        { title:"Tăng cường hợp tác với các trường đại học úc..."},
        { title:"Tăng cường hợp tác với các trường đại học úc..."}
    ];
  // list=[1,2,3,4,5,6,7,7,8,8];
  constructor() { }

  ngOnInit() {

  }

}
