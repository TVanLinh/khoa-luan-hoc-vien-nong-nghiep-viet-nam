import {Component, OnInit} from '@angular/core';
import {AddressModel} from "../model/address.model";
import {AddressService} from "../../shares/address.service";
import {arrays} from "typescript-collections";
import {CityModel} from "../model/city.model";
import {DistrictModel} from "../model/district.model";
import {GuildModel} from "../model/guild.model";
import {TaskService} from "../../shares/task.service";
import {Config} from "../../shares/config";
import {Http} from "@angular/http";

@Component({
  selector: 'app-manager-system',
  templateUrl: './manager-system.component.html',
  styleUrls: ['./manager-system.component.css']
})
export class ManagerSystemComponent implements OnInit {

  array: AddressModel;
  str: string;

  constructor(public addressService: AddressService, public  http: Http) {

  }

  ngOnInit() {
    // this.array = new AddressModel();
    // this.addressService.getCityById(16).subscribe(data => {
    //   this.array.city = new CityModel;
    //   this.array.city.name = data['Title'];
    //   this.array.city.code = data['ID'];
    //   this.array.districts = [];
    //
    //   this.addressService.getDistrictByCityID(this.array.city.code).subscribe((data: any[]) => {
    //
    //     for (let item of data) {
    //       let a = new DistrictModel();
    //       a.code = item['ID'];
    //       a.name = item['Title'];
    //       this.array.districts.push(a);
    //     }
    //
    //
    //     for (let i = 0; i < this.array.districts.length; i++) {
    //       this.array.districts[i].guids = [];
    //       this.addressService.getGuildByDistrictId(this.array.districts[i].code).subscribe((data: any[]) => {
    //         for (let item of data) {
    //           let a = new GuildModel();
    //           a.code = item['ID'];
    //           a.name = item['Title'];
    //           this.array.districts[i].guids.push(a);
    //         }
    //       }, err => {
    //
    //       }, () => {
    //         this.str = JSON.stringify(this.array);
    //       });
    //
    //     }
    //
    //   }, err => {
    //   }, () => {
    //
    //   });
    //
    // }, errr => {
    //
    // }, () => {
    //
    // });
  }

  list: AddressModel[] = [];


  save() {
    this.http.post(Config.CATALOG_ADDRESS_URL, {address: this.array}).subscribe(data => {
      console.log(JSON.stringify(data));
    });
  }

  // getData(id) {
  //   this.str = "";
  //   console.log(id);
  //   this.array = new AddressModel();
  //   this.addressService.getCityById(id).subscribe(data => {
  //     this.array.city = new CityModel;
  //     this.array.city.name = data['Title'];
  //     this.array.city.code = data['ID'];
  //     this.array.districts = [];
  //
  //     this.addressService.getDistrictByCityID(this.array.city.code).subscribe((data: any[]) => {
  //
  //       for (let item of data) {
  //         let a = new DistrictModel();
  //         a.code = item['ID'];
  //         a.name = item['Title'];
  //         this.array.districts.push(a);
  //       }
  //
  //
  //       for (let i = 0; i < this.array.districts.length; i++) {
  //         this.array.districts[i].guids = [];
  //         this.addressService.getGuildByDistrictId(this.array.districts[i].code).subscribe((data: any[]) => {
  //           for (let item of data) {
  //             let a = new GuildModel();
  //             a.code = item['ID'];
  //             a.name = item['Title'];
  //             this.array.districts[i].guids.push(a);
  //           }
  //         }, err => {
  //
  //         }, () => {
  //           this.str = JSON.stringify(this.array);
  //         });
  //
  //       }
  //
  //     }, err => {
  //     }, () => {
  //
  //     });
  //
  //   }, errr => {
  //
  //   }, () => {
  //
  //   });
  // }

}
