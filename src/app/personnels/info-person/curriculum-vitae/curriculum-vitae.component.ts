import {Component, ElementRef, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {TaskService} from "../../../shares/task.service";
import {AddressService} from "../../../shares/address.service";
import {Config} from "../../../shares/config";
import {MystorageService} from "../../../shares/mystorage.service";
import {CvModel} from "./cv.model";

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
    sex: "0",
    email: "",
    phone: "",
    placeBirth: {
      city: "0",
      district: "0",
      guild: "0"
    },
    homeTown: {
      city: "0",
      district: "0",
      guild: "0"
    },
    placeNow: {
      city: "0",
      district: "0",
      guild: "0",
      street: "",
      numberHome: ""
    },
    hashNation: false,
    nation: "0",
    identity: {identityNumber: "0", dateRange: new Date(), placeRange: ""},
    placeRegisterHouseHold: "",//noi dang ki ho khau thuong tru
    policyObject: "0",
    bloodGroup: "A"
  };

  formCV: FormGroup;

  listNation = [];
  listCity:any[] = [];	
  
  listDistrictBirthDay:any[]= [];
  listGuidBirthDay:any[]= [];
  
  constructor(public taskService: TaskService, protected eleRef: ElementRef,public addressService: AddressService ) {
    super(eleRef,taskService);
	this.addressService.getALl();
    // this.getCV();
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
  
  
   initListCity() {
	this.addressService.geCities().subscribe((data:any[])=>{
		this.listCity = data;
	});
  }
  
  cityBirthDayChange(id: number) {
     this.listDistrictBirthDay =[];
	 this.addressService.getDistrictByCityID(id).subscribe((data:any[])=>{
		this.listDistrictBirthDay = data;
	});
  }
  
   districtBirthDayChange(id: number) {
	  this.listGuidBirthDay =[];
	  this.addressService.getGuildByDistrictId(id).subscribe((data:any[])=>{
		this.listGuidBirthDay = data;
	});
  }
  
  
  

 

  initForm() {
    this.formCV = this.formBuilder.group({
      fullName: [this.infoBasic.fullName],
      birthDay: [this.infoBasic.birthDay],
      sex: [this.infoBasic.sex],
      email: [this.infoBasic.email],
      nameOther: [this.infoBasic.nameOther],
      bloodGroup: [this.infoBasic.bloodGroup],
      policyObject: [this.infoBasic.policyObject],
      nation: [this.infoBasic.nation],
      hashNation: [this.infoBasic.hashNation],
      phone: [this.infoBasic.phone],
      identity: this.formBuilder.group({
        identityNumber: [this.infoBasic.identity.identityNumber],
        dateRange: [this.infoBasic.identity.dateRange],
        placeRange: [this.infoBasic.identity.placeRange],
      }),

      homeTown: this.formBuilder.group({
        city: [this.infoBasic.homeTown.city],
        district: [this.infoBasic.homeTown.district],
        guild: [this.infoBasic.homeTown.guild],
      }),
      placeBirth: this.formBuilder.group({
        city: [this.infoBasic.placeBirth.city],
        district: [this.infoBasic.placeBirth.district],
        guild: [this.infoBasic.placeBirth.guild],
      }),
      placeRegisterHouseHold: this.infoBasic.placeRegisterHouseHold,
      placeNow: this.formBuilder.group({
        city: [this.infoBasic.placeNow.city],
        district: [this.infoBasic.placeNow.district],
        guild: [this.infoBasic.placeNow.guild],
        street: [this.infoBasic.placeNow.street],
        numberHome: [this.infoBasic.placeNow.numberHome],
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
