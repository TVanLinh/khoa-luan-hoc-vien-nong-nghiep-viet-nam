import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['../../form.css', './curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent extends BaseFormComponent implements OnInit {

  infoBasic = {
    image: "https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-9/20155874_814558885374479_7866568993068759970_n.jpg?oh=c57bfe0ba86f10f060ee960b7276bb1c&oe=5A2D2D58",
    staffCode: "1234569",
    fullName: "Tran Van Linh",
    birthDay: new Date(1995, 8, 18),
    sex: 1,
    email: "linhtran180895@gmail.com",
    nameOther: "Tv linh",
    nation: "Kinh",
    identityCardNumber: "113660331",
    dateRangeIdentityCard: new Date(2013, 9, 1),
    placeRangeIdentityCard: "Tan lac hoa binh",
    passportNumber: "45884555",
    dateRangePassport: new Date(),
    placeRangePassport: 'Hoa binh',
    job: "cong nhan",
    bloodGroup: "AB",
    policyObject: 1,
    national: "Viet Nam"
  };

  //que quan
  homeTown = {
    national: "Viet Nam",
    city: "Hoa binh",
    district: "Tan lac",
    guild: "Dong lai"
  };

  //que quan
  placeBirth = {
    national: "Viet Nam",
    city: "Hoa binh",
    district: "Tan lac",
    guild: "Dong lai"
  };

  //guild : phuong xa,organ : co quan
  phoneContact = {
    phone: "01644952648",
    home: "Hoa binh ysn lsv",
    organ: "01658799522"
  };

  //ho khau thuong chu
  houseHold = {
    city: "Hoa binh",
    district: "Tan Lac",
    guild: "Dong lai",
    street: "Tan lai",
    numberHome: ""
  };

  placeNow = {
    national: "Viet Nam",
    city: "Hoa binh",
    district: "Tan Lac",
    guild: "Dong lai",
    street: "Tan lai",
    numberHome: ""
  };

  formCV: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formCV = this.formBuilder.group({
      infoBasic: this.formBuilder.group({
        // image: [this.infoBasic.image],
        staffCode: [this.infoBasic.staffCode],
        fullName: [this.infoBasic.fullName],
        birthDay: [this.infoBasic.birthDay],
        sex: [this.infoBasic.sex],
        email: [this.infoBasic.email],
        nameOther: [this.infoBasic.nameOther],
        nation: [this.infoBasic.nation],
        identityCardNumber: [this.infoBasic.identityCardNumber],
        dateRangeIdentityCard: [this.infoBasic.dateRangeIdentityCard],
        placeRangeIdentityCard: [this.infoBasic.placeRangeIdentityCard],
        passportNumber: [this.infoBasic.passportNumber],
        dateRangePassport: [this.infoBasic.dateRangePassport],
        placeRangePassport: [this.infoBasic.placeRangePassport],
        job: [this.infoBasic.job],
        bloodGroup: [this.infoBasic.bloodGroup],
        policyObject: [this.infoBasic.policyObject],
      }),
      homeTown: this.formBuilder.group({
        national: [this.homeTown.national],
        city: [this.homeTown.city],
        district: [this.homeTown.district],
        guild: [this.homeTown.guild],
      }),
      placeBirth: this.formBuilder.group({
        national: [this.placeBirth.national],
        city: [this.placeBirth.city],
        district: [this.placeBirth.district],
        guild: [this.placeBirth.guild],
      }),
      phoneContact: this.formBuilder.group({
        phone: [this.phoneContact.phone],
        home: [this.phoneContact.home],
        organ: [this.phoneContact.organ],
      }),
      houseHold: this.formBuilder.group({
        city: [this.houseHold.city],
        district: [this.houseHold.district],
        guild: [this.houseHold.guild],
        street: [this.houseHold.street],
        numberHome: [this.houseHold.numberHome],
      }),
      placeNow: this.formBuilder.group({
        national: [this.placeNow.national],
        city: [this.placeNow.city],
        district: [this.placeNow.district],
        guild: [this.placeNow.guild],
        street: [this.placeNow.street],
        numberHome: [this.placeNow.numberHome],
      })
    });
  }

}
