import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import * as Collections from "typescript-collections";
import LinkedList from "typescript-collections/dist/lib/LinkedList";
import {BaseFormComponent} from "../../base-form.component";
import {PartyModel} from "./model/party.model";
import {ArmyModel} from "./model/army.model";
import {UnionModel} from "./model/union.model";
import {DetailAPUModel} from "./model/detail.model";
import {PartyConfig} from "./party.config";
import {TaskService} from "../../../shares/task.service";
import {Config} from "../../../shares/config";
import {MessageError} from "../../../shares/message.error";
import {GroupModel} from "./model/group.model";
import {ValidService} from "../../../shares/valid.service";

declare const jQuery: any;

@Component({
  selector: 'app-party-union',
  templateUrl: './party-union.component.html',
  styleUrls: ['../../form.css', './party-union.component.css']
})
export class PartyUnionComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @Input() editEnable = true;
  formData: FormGroup;
  formDetailParty: FormGroup;
  formDetailUnion: FormGroup;
  formDetailGroup: FormGroup;

  positionTemp: DetailAPUModel = null;

  listActionParty = new Collections.LinkedList<DetailAPUModel>();
  listActionUnion = new Collections.LinkedList<DetailAPUModel>();
  listActionGroup = new Collections.LinkedList<DetailAPUModel>();

  cssClassModal: string = 'my-modal-lg';

  rankArmy = PartyConfig.RANK_AMRY;
  rankVeterans = PartyConfig.RANK_VETERAN;

  party: PartyModel = {
    dateIn: null,
    dateInOfical: null,
    placeIn: "",
    process: []
  };


  army: ArmyModel = {
    dateIn: null,
    dateOut: null,
    rankTallest: "",
    rankVeterans: "",
    bookInjured: "",
    formInjured: ""
  };

  union: UnionModel = {
    dateIn: null,
    placeIn: "",
    process: []
  };

  group: GroupModel = {
    dateIn: null,
    process: []
  };

  partyNotValid = false;
  unionNotValid = false;
  groupNotValid = false;
  hashData = false;

  constructor(protected eleRef: ElementRef, public  taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.inInitForm();
    this.getDataFromServer();
    jQuery(this.eleRef.nativeElement).find('.modal-lg').css({width: '1200px !important'});
  }


  inInitForm() {
    this.formData = this.formBuilder.group({
      //hoat dong dang
      actionParty: this.formBuilder.group({
        dateIn: [this.party.dateIn],//ngay vao dang
        dateInOfical: [this.party.dateInOfical],//ngay chinh thuc vao dang
        placeIn: [this.party.placeIn]//noi vao dang
      }),

      //hoat dong doan
      actionUnion: this.formBuilder.group({
        dateIn: [this.union.dateIn],
        placeIn: [this.union.placeIn]
      }),

      //hoat  dong quan ngu
      actionArmy: this.formBuilder.group({
        dateIn: [this.army.dateIn],//ngay nhap ngu
        dateOut: [this.army.dateOut],//ngay xuat ngu
        rankTallest: [this.army.rankTallest],// quan ham cao nhat
        rankVeterans: [this.army.rankVeterans], // Hang thuong binh
        bookInjured: [this.army.bookInjured],//so thuong tat
        formInjured: [this.army.formInjured],// hinh thuc thuong tat
      }),

      //quá trình hoạt động công đoàn
      actionGroup: this.formBuilder.group({
        dateIn: [this.group.dateIn]
      })
    });


    this.formDetailParty = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      place: ['', Validators.required],
      position: ['', Validators.required],
      now: [false]
    });

    this.formDetailUnion = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      place: ['', Validators.required],
      position: ['', Validators.required],
      now: [false],
    });


    this.formDetailGroup = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      place: ['', Validators.required],
      position: ['', Validators.required],
      now: [false],
    });
  }

//xu ly form main

//----------------
  openModal(target: any) {
    target.open();
    // this.modalComponent.open();
  }

  closeModal(target: any) {
    target.close();
  }

//  ----------------


  addParty() {
    let valueForm = this.formDetailParty.value;

    let data: any[] = [valueForm.dateFrom, valueForm.place, valueForm.position];

    this.updateView("formDetailParty", this.formDetailParty.valid);

    console.log(this.formDetailParty.valid + "  " + ValidService.isNotBlanks(data));
    if (!ValidService.isNotBlanks(data) || !this.formDetailParty.valid) {
      this.partyNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    this.partyNotValid = false;

    //--------------------------------------
    if (valueForm.now === true) {
      this.toggleBoolean(this.listActionParty);
    }

    if (this.positionTemp == null) {
      this.listActionParty.add(valueForm);
    } else {
      let idex = this.listActionParty.indexOf(this.positionTemp);
      this.listActionParty.remove(this.positionTemp);
      this.listActionParty.add(valueForm, idex);

    }
    this.formDetailParty.reset();
    this.positionTemp = null;
  }


  addUnion() {
    let valueForm = this.formDetailUnion.value;

    let data = [valueForm.dateFrom, valueForm.place, valueForm.position];

    this.updateView("formDetailUnion", this.formDetailUnion.valid);

    if (!ValidService.isNotBlanks(data) || !this.formDetailUnion.valid) {
      this.unionNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }
    this.unionNotValid = false;
    //------------------------------------------------------
    if (valueForm.now === true) {
      this.toggleBoolean(this.listActionUnion);
    }

    if (this.positionTemp == null) {
      this.listActionUnion.add(valueForm);
    } else {
      let idex = this.listActionUnion.indexOf(this.positionTemp);
      this.listActionUnion.remove(this.positionTemp);
      this.listActionUnion.add(valueForm, idex);
    }
    this.formDetailUnion.reset();
    this.positionTemp = null;
  }

  addGroup() {
    let valueForm = this.formDetailGroup.value;
    console.log("valueForm : " + JSON.stringify(valueForm));


    let data = [valueForm.dateFrom, valueForm.place, valueForm.position];

    this.updateView("formDetailGroup", this.formDetailGroup.valid);

    if (!ValidService.isNotBlanks(data) || !this.formDetailGroup.valid) {
      this.groupNotValid = true;
      this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
      return;
    }

    this.groupNotValid = false;
    //------------------------------------------
    if (valueForm.now === true) {
      this.toggleBoolean(this.listActionGroup);
    }
    if (this.positionTemp == null) {
      this.listActionGroup.add(valueForm);
    } else {
      let idex = this.listActionGroup.indexOf(this.positionTemp);
      this.listActionGroup.remove(this.positionTemp);
      this.listActionGroup.add(valueForm, idex);
    }
    this.formDetailGroup.reset();
    this.positionTemp = null;
  }

  removeItem(list: LinkedList<any>, item: DetailAPUModel) {
    list.remove(item);
  }


//resetForm
  resetForm(tartget: any) {
    tartget.reset();
  }

  editItem(target: string, item: DetailAPUModel) {
    this.positionTemp = item;
    switch (target) {
      case 'party':
        this.updateValid("formDetailParty");
        this.formDetailParty.setValue({
          dateFrom: item.dateFrom,
          place: item.place,
          position: item.position,
          now: item.now
        });
        break;
      case 'union':
        this.updateValid("formDetailUnion");
        this.formDetailUnion.setValue({
          dateFrom: item.dateFrom,
          place: item.place,
          position: item.position,
          now: item.now,
        });
        break;
      case 'group':
        this.updateValid("formDetailGroup");
        this.formDetailGroup.setValue({
          dateFrom: item.dateFrom,
          place: item.place,
          position: item.position,
          now: item.now,
        });
        break;
    }

  }


  onSave() {
    console.log(this.formData.value);
    let data = {};
    let formArm = this.formData.value.actionArmy;

    ///check valid cong doan

    let army: ArmyModel = {
      dateIn: formArm.dateIn,
      dateOut: formArm.dateOut,
      rankTallest: formArm.rankTallest,
      rankVeterans: formArm.rankVeterans,
      bookInjured: formArm.bookInjured,
      formInjured: formArm.formInjured,
    };

    let partyIsValid = true;
    let unionaIsValid = true;
    let groupIsValid = true;
    let armyIsValid = true;


    if ((army.dateIn && !army.dateOut) || (!army.dateIn && army.dateOut)) {
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Quân ngũ ", "warning");
      armyIsValid = false;
      return;
    }

    let formParty = this.formData.value.actionParty;
    let party: PartyModel = {
      dateIn: formParty.dateIn,
      dateInOfical: formParty.dateInOfical,
      placeIn: formParty.placeIn,
      process: this.listActionParty.toArray()
    };


    //check  valid dang
    let partyValid = [party.dateIn, party.dateInOfical, party.placeIn];

    if (this.listActionParty.size() > 0 && !ValidService.isNotBlanks(partyValid)) {
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Đảng", "warning");
      partyIsValid = false;
      return;
    }

    if ((party.dateIn || party.dateInOfical || ValidService.isNotBlank(party.placeIn)) && this.listActionParty.size() == 0) {
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Đảng", "warning");
      partyIsValid = false;
      return;
    }

    if (ValidService.isNotBlanks(partyValid) && this.listActionParty.size() == 0) {
      partyIsValid = formArm;
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Đảng", "warning");
      return;
    }

    //---------------------------------------------

    //check valid doan

    let formUnion = this.formData.value.actionUnion;
    let union: UnionModel = {
      dateIn: formUnion.dateIn,
      placeIn: formUnion.placeIn,
      process: this.listActionUnion.toArray()
    };


    let unionValid = [union.dateIn, union.placeIn];

    if (this.listActionUnion.size() > 0 && !ValidService.isNotBlanks(unionValid)) {
      unionaIsValid = false;
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Đoàn ", "warning");
      return;
    }

    if ((union.dateIn || ValidService.isNotBlank(union.placeIn)) && this.listActionUnion.size() == 0) {
      unionaIsValid = false;
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Đoàn", "warning");
      return;
    }

    if (ValidService.isNotBlanks(unionValid) && this.listActionUnion.size() == 0) {
      unionaIsValid = false;
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Đoàn", "warning");
      return;
    }

    //check valid cong doan

    let formGroup = this.formData.value.actionGroup;
    let group: GroupModel = {
      dateIn: formGroup.dateIn,
      process: this.listActionGroup.toArray()
    };


    let groupValid = [group.dateIn];

    if (this.listActionGroup.size() > 0 && !ValidService.isNotBlanks(groupValid)) {
      groupIsValid = false;
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Công Đoàn ", "warning");
      return;
    }

    if (group.dateIn != null && this.listActionGroup.size() == 0) {
      console.log("th2");
      groupIsValid = false;
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Công Đoàn", "warning");
      return;
    }

    if (ValidService.isNotBlanks(groupValid) && this.listActionGroup.size() == 0) {
      groupIsValid = false;
      this.updateMessge("Vui lòng kiểm tra lại thông tin quá trình hoạt động Công Đoàn", "warning");
      return;
    }


    if (armyIsValid) {
      data['army'] = army;
      if (super.compareDate(formArm.dateIn, formArm.dateOut) >= 0) {
        return;
      }
    }

    if (partyIsValid) {
      data['party'] = party;
    }

    if (unionaIsValid) {
      data['union'] = union;
    }

    if (groupIsValid) {
      data['group'] = group;
    }

    let validGlobal = [army.dateIn, army.dateOut, party.dateIn,
      party.dateInOfical, party.placeIn, union.placeIn, union.dateIn, group.dateIn];


    if (!ValidService.isNotBlanks(validGlobal)) {
      super.updateMessge("Vui lòng nhập dữ liệu trước khi ghi nhận ", "warning");
      return;
    }

    let body = {};
    body['armyPUG'] = data;
    body['staffCode'] = this.user['username'];
    this.taskService.post(Config.ARMYPUG_URL, {data: body}).subscribe((data) => {
      // console.log(data);
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "success");
    });
    // console.log(JSON.stringify(data));

  }

  getDataFromServer() {
    if (this.user) {
      this.taskService.get(Config.ARMYPUG_URL + "?username=" + this.user['username']).subscribe((data) => {
        // console.log("data:  " + JSON.stringify(data));
        if (data && data['armyPUG']) {
          this.updateForm(data['armyPUG']);
          this.hashData = true;
        } else {
       //  this.hashData = false;
        }

      });
    }
  }


  updateForm(data) {
    let union = data['union'];
    let party = data['party'];
    let army = data['army'];
    let group = data['group'];

    if (party) {
      this.party = party;
      this.formData.patchValue({
        actionParty: {
          dateIn: party['dateIn'],//ngay vao dang
          dateInOfical: party['dateInOfical'],//ngay chinh thuc vao dang
          placeIn: party['placeIn']//noi vao dang
        },
      });
      this.listActionParty.clear();
      for (let item of party['process']) {
        this.listActionParty.add(item);
      }
    }

    if (army) {
      this.army = army;
      this.formData.patchValue({
        actionArmy: {
          dateIn: army['dateIn'],//ngay nhap ngu
          dateOut: army['dateOut'],//ngay xuat ngu
          rankTallest: army['rankTallest'],// quan ham cao nhat
          rankVeterans: army['rankVeterans'], // Hang thuong binh
          bookInjured: army['bookInjured'],//so thuong tat
          formInjured: army['formInjured'],// hinh thuc thuong tat
        }
      });
    }

    if (union) {
      this.union = union;
      this.formData.patchValue({
        actionUnion: {
          dateIn: union['dateIn'],
          placeIn: union['placeIn']
        }
      });

      this.listActionUnion.clear();
      for (let item of union['process']) {
        this.listActionUnion.add(item);
      }
    }

    if (group) {
      this.group = group;
      this.formData.patchValue({
        actionGroup: {
          dateIn: group['dateIn']
        }
      });

      for (let item of group['process']) {
        this.listActionGroup.add(item);
      }
    }
  }

}
