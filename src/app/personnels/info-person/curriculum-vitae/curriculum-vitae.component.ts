import {Component, ElementRef, OnInit} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {AddressService} from "../../../shares/address.service";
import {Config} from "../../../shares/config";
import {MystorageService} from "../../../shares/mystorage.service";
import {CvModel} from "./cv.model";
import {AddressModel} from "../../model/address.model";
import {DistrictModel} from "../../model/district.model";
import {GuildModel} from "../../model/guild.model";

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['../../form.css', './curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent extends BaseFormComponent implements OnInit {

  avatar: string = "";


  infoBasic: CvModel = {
    fullName: "",
    nameOther: "",
    avatarUrl: "",
    birthDay: new Date(),
    sex: "",
    email: "",
    phone: "",
    placeBirth: {
      city: "",
      district: "",
      guild: ""
    },
    homeTown: {
      city: "",
      district: "",
      guild: ""
    },
    placeNow: {
      city: "",
      district: "",
      guild: "",
      street: "",
      numberHome: ""
    },
    hashNation: false,
    nation: "",
    identity: {identityNumber: "", dateRange: null, placeRange: ""},
    placeRegisterHouseHold: "",//noi dang ki ho khau thuong tru
    policyObject: "",
    bloodGroup: "A"
  };

  formCV: FormGroup;

  listNation = [];
  listCity: AddressModel[] = [];
  guidsBithday: GuildModel[] = [];
  guilsHomeTown: GuildModel[] = [];

  birthDays: AddressModel = new AddressModel();
  homeTown: AddressModel = new AddressModel();

  constructor(public taskService: TaskService, protected eleRef: ElementRef, public addressService: AddressService) {
    super(eleRef, taskService);
    this.getCV();
  }

  ngOnInit() {
    this.initForm();
    this.getCV();
    this.getNation();
    this.initListCity();
  }

  private getNation() {
    this.taskService.get(Config.HOST_SERVER + "/nation").subscribe((data: any) => {
      this.listNation = data;
      this.listNation.sort();
    });
  }

  cityChange(id: number, target: string) {
    console.log("id " + id + "  target " + target);

    if (target == "NS") {
      this.birthDays = this.addressService.findAddressByCityId(this.listCity, id);
    } else if (target == 'QUEQUAN') {
      this.homeTown = this.addressService.findAddressByCityId(this.listCity, id);
    }
  }

  districtChange(id: number, target: string) {
    if (target == "NS") {
      this.guidsBithday = this.addressService.findGuildByDistrictId(this.birthDays, id);
    } else if (target == 'QUEQUAN') {
      this.guilsHomeTown = this.addressService.findGuildByDistrictId(this.homeTown, id);
    }
  }

  initListCity() {
    // this.addressService.getAllCity().subscribe((data: any) => {
    //   this.listCity = data['LtsItem'];
    //   this.listCity.sort();
    // });
    this.addressService.getData().subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {

        // if (item !== 'undefined' && item.code !== 'undefined' && item.code.name !== 'undefined') {
        //   console.log(data)
        if (typeof data[i].city != 'undefined') {
          console.log("typeof data[i].city " + data[i].city.code + " " + typeof data[i].city + "   " + JSON.stringify(data[i].city));
          let a = new AddressModel();
          a.city = data[i]['city'];
          a.districts = data[i]['districts'];
          this.listCity.push(a);
        } else {
          console.log("ofdkfkdfddfjkfkd " + JSON.stringify(data[i]))
        }


        // }

      }
    });
  }

  initForm() {
    this.formCV = this.formBuilder.group({
      fullName: [this.infoBasic.fullName, Validators.required],
      birthDay: [this.infoBasic.birthDay, Validators.required],
      sex: [this.infoBasic.sex, Validators.required],
      email: [this.infoBasic.email, Validators.required],
      nameOther: [this.infoBasic.nameOther],
      bloodGroup: [this.infoBasic.bloodGroup, Validators.required],
      policyObject: [this.infoBasic.policyObject],
      nation: [this.infoBasic.nation, Validators.required],
      hashNation: [this.infoBasic.hashNation, Validators.required],
      phone: [this.infoBasic.phone, Validators.required],
      identity: this.formBuilder.group({
        identityNumber: [this.infoBasic.identity.identityNumber, Validators.required],
        dateRange: [this.infoBasic.identity.dateRange, Validators.required],
        placeRange: [this.infoBasic.identity.placeRange, Validators.required],
      }),

      homeTown: this.formBuilder.group({
        city: [this.infoBasic.homeTown.city, Validators.required],
        district: [this.infoBasic.homeTown.district, Validators.required],
        guild: [this.infoBasic.homeTown.guild, Validators.required],
      }),
      placeBirth: this.formBuilder.group({
        city: [this.infoBasic.placeBirth.city, Validators.required],
        district: [this.infoBasic.placeBirth.district, Validators.required],
        guild: [this.infoBasic.placeBirth.guild, Validators.required],
      }),
      placeRegisterHouseHold: this.infoBasic.placeRegisterHouseHold,
      placeNow: this.formBuilder.group({
        city: [this.infoBasic.placeNow.city, Validators.required],
        district: [this.infoBasic.placeNow.district, Validators.required],
        guild: [this.infoBasic.placeNow.guild, Validators.required],
        street: [this.infoBasic.placeNow.street, Validators.required],
        numberHome: [this.infoBasic.placeNow.numberHome, Validators.required],
      })
    });
  }

  avatarChange($even) {
    var files = $even.target.files;
    var file = files[0];
    console.log(file.name);
    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }


  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    this.infoBasic.avatarUrl = "data:image/png;base64," + base64textString;
    this.avatar = "data:image/png;base64," + base64textString;
  }

  onSave() {

    this.updateView("cv", this.formCV.valid);
    if (!this.formCV.valid) {
      return;
    }

    let userName = MystorageService.getAcount()['user']["username"];
    let formValue = this.formCV.value;
    let cv = formValue;
    cv['avatarUrl'] = this.infoBasic.avatarUrl;
    let data = {data: {staffCode: userName, cv: cv}};
    this.taskService.post(Config.CV_URL, data).subscribe(data => {
      console.log(data);
      this.updateMessge(this.messageError.success, "success");
    });

  }

  getCV() {
    this.taskService.get(Config.CV_URL + "?username=" + this.acount['username']).subscribe((data) => {
      if (data['cv']) {
        this.infoBasic = data.cv;
        this.updateForm(this.infoBasic);
      }
    });
  }


  private updateForm(value: CvModel) {
    this.formCV.patchValue({
      fullName: value.fullName,
      birthDay: value.birthDay,
      sex: value.sex,
      email: value.email,
      nameOther: value.nameOther,
      bloodGroup: value.bloodGroup,
      policyObject: value.policyObject,
      nation: value.nation,
      hashNation: value.hashNation,
      phone: value.phone,
      identity: {
        identityNumber: value.identity.identityNumber,
        dateRange: value.identity.dateRange,
        placeRange: value.identity.placeRange,
      },
      homeTown: {
        city: value.homeTown.city,
        district: value.homeTown.district,
        guild: value.homeTown.guild,
      },
      placeBirth: {
        city: value.placeBirth.city,
        district: value.placeBirth.district,
        guild: value.placeBirth.guild,
      },
      placeRegisterHouseHold: value.placeRegisterHouseHold,
      placeNow: {
        city: value.placeNow.city,
        district: value.placeNow.district,
        guild: value.placeNow.guild,
        street: value.placeNow.street,
        numberHome: value.placeNow.numberHome,
      }
    });
  }
}
