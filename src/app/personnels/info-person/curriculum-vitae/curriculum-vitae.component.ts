import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {AddressService} from "../../../shares/address.service";
import {Config} from "../../../shares/config";
import {MystorageService} from "../../../shares/mystorage.service";
import {CvModel} from "./cv.model";
import {AddressModel} from "../../model/address.model";
import {GuildModel} from "../../model/guild.model";
import {ValidService} from "../../../shares/valid.service";
import {AcountShareService} from "../../../shares/acount-share.service";
import {CityModel} from "../../model/city.model";

declare const jQuery: any;


@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['../../form.css', './curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent extends BaseFormComponent implements OnInit {

  @Input() user: any = null;
  @Input() editEnable = true;
  avatar: string = "";

  formTouch = false;

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
  // user: any;

  listNation = [];
  listCity: AddressModel[] = [];
  guidsBithday: GuildModel[] = [];
  guilsHomeTown: GuildModel[] = [];
  guilsPlaceNow: GuildModel[] = [];

  birthDays: AddressModel = new AddressModel();
  homeTown: AddressModel = new AddressModel();
  placeNow: AddressModel = new AddressModel();

  constructor(public taskService: TaskService, protected eleRef: ElementRef,
              public addressService: AddressService, private  acountService: AcountShareService) {
    super(eleRef, taskService);
    this.birthDays.city =  new CityModel();
    this.homeTown.city =  new CityModel();
    this.placeNow.city =  new CityModel();

  }

  ngOnInit() {
    this.initListCity();
    // console.log(JSON.stringify(this.user));
    this.initForm();
    this.getNation();

  }

  private getNation() {
    this.taskService.get(Config.CATALOG_NATION_URL).subscribe((data: any) => {
      this.listNation = data;
      this.listNation.sort();
    });
  }

  cityChange(id: number, target: string) {
    console.log("id " + id + "  target " + target);

    if (target == "NS") {
      this.birthDays = this.addressService.findAddressByCityId(this.listCity, id);

      this.formCV.patchValue({
        placeBirth: {
          district: '',
          guild: ''
        }
      });
    } else if (target == 'QUEQUAN') {
      this.homeTown = this.addressService.findAddressByCityId(this.listCity, id);
      this.formCV.patchValue({
        homeTown: {
          district: '',
          guild: ''
        }
      });
    } else if (target == 'NOIOHIENTAI') {
      this.placeNow = this.addressService.findAddressByCityId(this.listCity, id);
      this.formCV.patchValue({
        placeNow: {
          district: '',
          guild: ''
        }
      });
    }
  }

  districtChange(id: number, target: string) {
    if (target == "NS") {
      this.guidsBithday = this.addressService.findGuildByDistrictId(this.birthDays, id);
      this.formCV.patchValue({
        placeBirth: {
          guild: ''
        }
      });
    } else if (target == 'QUEQUAN') {
      this.guilsHomeTown = this.addressService.findGuildByDistrictId(this.homeTown, id);
      this.formCV.patchValue({
        homeTown: {
          guild: ''
        }
      });
    } else if (target == 'NOIOHIENTAI') {
      this.guilsPlaceNow = this.addressService.findGuildByDistrictId(this.placeNow, id);
      this.formCV.patchValue({
        placeNow: {
          guild: ''
        }
      });
    }
  }

  initListCity() {
    this.addressService.getData().subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {

        if (typeof data[i].city != 'undefined') {
          let a = new AddressModel();
          // a.city.districts = [];
          a.city = data[i]['city'];
          // a.city.districts = data[i]['city']['districts'];
          // a.city.districts = data[i]['districts'];
          this.listCity.push(a);
        } else {
        }
      }
    }, err => {
    }, () => {
      this.getCV();
    });
  }

  initForm() {
    // this.user = MystorageService.getAcount()['user'];
    this.formCV = this.formBuilder.group({
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
      placeRegisterHouseHold: [this.infoBasic.placeRegisterHouseHold, Validators.required],
      placeNow: this.formBuilder.group({
        city: [this.infoBasic.placeNow.city, Validators.required],
        district: [this.infoBasic.placeNow.district, Validators.required],
        guild: [this.infoBasic.placeNow.guild, Validators.required],
        street: [this.infoBasic.placeNow.street],
        numberHome: [this.infoBasic.placeNow.numberHome],
      })
    });
  }

  avatarChange($even) {
    var files = $even.target.files;
    var file = files[0];

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
    this.formTouch = true;

    let valueForm = this.formCV.value;

    let valid = [valueForm.phone,
      valueForm.homeTown.city, valueForm.homeTown.district, valueForm.homeTown.guild,
      valueForm.placeBirth.city, valueForm.placeBirth.district, valueForm.placeBirth.guild,
      valueForm.placeNow.city, valueForm.placeNow.district, valueForm.placeNow.guild,
      valueForm.placeRegisterHouseHold,
      valueForm.identity.identityNumber, valueForm.identity.dateRange, valueForm.identity.placeRange, valueForm.nation
    ];

    this.updateView("form-cv", this.formCV.valid);
    if (!ValidService.isNotBlanks(valid) || !this.formCV.valid) {
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    let userName = this.user.username;
    let formValue = this.formCV.value;
    let cv = formValue;
    cv['avatarUrl'] = this.infoBasic.avatarUrl;

    if (MystorageService.getAcount()['user']['username'] == this.user.username) {
      this.acountService.shareAvatarEvent(cv['avatarUrl']);
    }
    let data = {data: {staffCode: userName, cv: cv}};

    this.taskService.post(Config.CV_URL, data).subscribe(data => {
      this.updateMessge(this.messageError.success, "success");
    }, err => {
      console.log("cv save err " + err)
    }, () => {
    });

  }

  getCV() {
    if (this.user) {
      this.taskService.get(Config.CV_URL + "?username=" + this.user.username).subscribe((data) => {
        if (data && data['cv']) {
          this.infoBasic = data.cv;
          this.birthDays = this.addressService.findAddressByCityId(this.listCity, this.infoBasic.placeBirth.city);
          this.guidsBithday = this.addressService.findGuildByDistrictId(this.birthDays, this.infoBasic.placeBirth.district);

          this.homeTown = this.addressService.findAddressByCityId(this.listCity, this.infoBasic.homeTown.city);
          this.guilsHomeTown = this.addressService.findGuildByDistrictId(this.homeTown, this.infoBasic.homeTown.district);

          this.placeNow = this.addressService.findAddressByCityId(this.listCity, this.infoBasic.placeNow.city);
          this.guilsPlaceNow = this.addressService.findGuildByDistrictId(this.placeNow, this.infoBasic.placeNow.district);

          this.updateForm(this.infoBasic);
        }
      });
    }

  }


  private updateForm(value: CvModel) {
    this.formCV.patchValue({
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

  print() {
    let mywindow = window.open('', 'Print', 'height=100%,width=auto');

    mywindow.document.write('<html><head><title>' + 'Sơ yếu lí lịch ' + '</title>');

    mywindow.document.write(" <link href='/assets/vendors/bootstrap/css/bootstrap.min.css' type='text/css' rel='stylesheet'/>");
    mywindow.document.write("<link href= '/assets/css/print/cv-print.css' media='all' rel='stylesheet' type='text/css'/>");
    mywindow.document.write('</head><body > <div class="container" style="width: 1200px">');

    // mywindow.document.write()
    mywindow.document.write(jQuery("#cv-print").html());
    mywindow.document.write('</div></body></html>');

    mywindow.focus(); // necessary for IE >= 10*/
    setTimeout(() => {
      mywindow.print();
      // mywindow.close();
    }, 1000);

  }

  getCityName(id) {
    if (!id) {
      return '';
    }
    let temp = this.addressService.findAddressByCityId(this.listCity, id);
    return temp ? temp.city.name : ''
  }

  getDistrictName(city, id) {
    if (!city || !id) {
      return '';
    }
    let address = this.addressService.findAddressByCityId(this.listCity, city);
    // console.log("address " + JSON.stringify(address));
    let temp = this.addressService.findDistrict(address, id);
    // console.log("temp " + JSON.stringify(temp));
    return temp ? temp.name : ''
  }


  getGuildName(city, district, guild) {
    if (!city || !district || !guild) {
      return '';
    }
    let temp = this.addressService.findGuild(this.listCity, city, district, guild);
    return temp ? temp.name : ''
  }

}
