import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {NationalService} from "../../../shares/national.service";

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

    bloodGroup: "AB",
    policyObject: 1,
  };

  //que quan
  homeTown = {
    city: "Hoa binh",
    district: "Tan lac",
    guild: "Dong lai"
  };

  //que quan
  placeBirth = {
    city: "Hoa binh",
    district: "Tan lac",
    guild: "Dong lai"
  };

  //guild : phuong xa,organ : co quan
  phoneContact = {phone: "01644952648"};

  placeNow = {
    city: "Hoa binh",
    district: "Tan Lac",
    guild: "Dong lai",
    street: "Tan lai",
    numberHome: ""
  };

  formCV: FormGroup;

  constructor(private nationalService: NationalService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formCV = this.formBuilder.group({
      staffCode: [this.infoBasic.staffCode],
      fullName: [this.infoBasic.fullName],
      birthDay: [this.infoBasic.birthDay],
      sex: [this.infoBasic.sex],
      email: [this.infoBasic.email],
      nameOther: [this.infoBasic.nameOther],
      bloodGroup: [this.infoBasic.bloodGroup],
      policyObject: [this.infoBasic.policyObject],
      nation:[''],
      phone: [this.phoneContact.phone],
      identityCart:  this.formBuilder.group({
        identityCardNumber: [this.infoBasic.identityCardNumber],
        dateRangeIdentityCard: [this.infoBasic.dateRangeIdentityCard],
        placeRangeIdentityCard: [this.infoBasic.placeRangeIdentityCard],
      }),

      homeTown: this.formBuilder.group({
        city: [this.homeTown.city],
        district: [this.homeTown.district],
        guild: [this.homeTown.guild],
      }),
      placeBirth: this.formBuilder.group({
        city: [this.placeBirth.city],
        district: [this.placeBirth.district],
        guild: [this.placeBirth.guild],
      }),
      placeRegisterHouseHold: ["Dong lai tan lac hoa binh"],
      placeNow: this.formBuilder.group({
        city: [this.placeNow.city],
        district: [this.placeNow.district],
        guild: [this.placeNow.guild],
        street: [this.placeNow.street],
        numberHome: [this.placeNow.numberHome],
      })
    });
  }

}