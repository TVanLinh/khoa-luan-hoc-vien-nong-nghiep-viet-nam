import {Component, ElementRef, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
// import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import * as Collections from "typescript-collections";
import LinkedList from "typescript-collections/dist/lib/LinkedList";
import {BaseFormComponent} from "../../base-form.component";
declare const jQuery: any;
@Component({
  selector: 'app-party-union',
  templateUrl: './party-union.component.html',
  styleUrls: ['../../form.css', './party-union.component.css']
})
export class PartyUnionComponent extends BaseFormComponent implements OnInit {

  formData: FormGroup;
  formDetailParty: FormGroup;
  formDetailUnion: FormGroup;
  positonUpdate: number = -1;

  listActionParty = new Collections.LinkedList<DetailActionParty>();
  listActionUnion = new Collections.LinkedList<DetailActionUnion>();

  cssClassModal: string = 'my-modal-lg';

  constructor(private eleRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.inInitForm();
    jQuery(this.eleRef.nativeElement).find('.modal-lg').css({width:'1200px !important'});
  }


  inInitForm() {
    this.formData = this.formBuilder.group({

      //hoat dong dang
      actionParty: this.formBuilder.group({
        isParty: [true],
        dateInParty: ['12/12/2013'],//ngay vao dang
        dateInPartyfOficial: ['11/1/2014'],//ngay chinh thuc vao dang
        placeInParty: ['Hoa binh'],//noi vao dang
        positonNow: ['Dang vien'],//vi tri hien tai
        placePerformanceParty: ['Hoa Binh'] //noi sinh hoat hien tai
      }),

      //hoat dong doan
      actionUnion: this.formBuilder.group({
        dateInUnion: [''],
        placeInUnion: ['THPT Doan ket '],
        postionTallest: []
      }),

      //hoat  dong quan ngu
      actionArmy: this.formBuilder.group({
        isArmy: [true],
        dateInArmy: [],//ngay nhap ngu
        dateOutArmy: [],//ngay xuat ngu
        rankTallest: [],// quan ham cao nhat
        postionTallestHCCB: [], //vi tri cao nhat trong hoi chien binh
        isVeterans: [true], //la thuong binh
        rankVeterans: [], // Hang thuong binh
        bookInjured: [],//so thuong tat
        formInjured: [],// hinh thuc thuong tat
      }),

      //quá trình hoạt động công đoàn
      actionCD: this.formBuilder.group({
        dateInCD: ['20/10/2013'],
        positionTallest: ['Doi truong']
      })
    });

    this.formDetailParty = this.formBuilder.group({
      dateFrom: [''],
      placePerformance: [''],
      position: [''],
      positionOther: [''],
      now: [false]
    });

    this.formDetailUnion = this.formBuilder.group({
      dateFrom: [''],
      placePerformance: [''],
      position: [''],
      postionTallest: [''],
    });
  }

  //xu ly form main
  onSave() {
    console.log(this.formData.value);
  }

  blockData() {

  }

  //----------------
  openModal(target: any) {
    target.open();
    // this.modalComponent.open();
  }

  closeModal(target: any) {
    target.close();
  }

  //  ----------------

  //xu ly form action detail party
  addItem(target: string) {
    let valueForm;

    switch (target) {
      case 'party':
        valueForm = (this.formDetailParty.value);
        if (this.positonUpdate == -1) {
          this.listActionParty.add(valueForm);
        } else {
          this.listActionParty.removeElementAtIndex(this.positonUpdate);
          this.listActionParty.add(valueForm, this.positonUpdate);
        }
        break;
      case 'union':
        valueForm = (this.formDetailUnion.value);
        if (this.positonUpdate == -1) {
          this.listActionUnion.add(valueForm);
        } else {
          this.listActionUnion.removeElementAtIndex(this.positonUpdate);
          this.listActionUnion.add(valueForm, this.positonUpdate);
        }
        break;
    }
  }

  removeItem(list: LinkedList<any>, i: number) {
    this.positonUpdate = -1;
    list.removeElementAtIndex(i);
  }

  //resetForm
  resetForm(tartget: any) {
    tartget.reset();
  }

  editItem(target: string, index: number) {
    this.positonUpdate = index;
    switch (target) {
      case 'party':
        this.formDetailParty.setValue({
          dateFrom: this.listActionParty.elementAtIndex(index).dateFrom,
          placePerformance: this.listActionParty.elementAtIndex(index).placePerformance,
          position: this.listActionParty.elementAtIndex(index).position,
          positionOther: this.listActionParty.elementAtIndex(index).positionOther,
          now: this.listActionParty.elementAtIndex(index).now
        });
        break;
      case 'union':
        this.formDetailUnion.setValue({
          dateFrom: this.listActionUnion.elementAtIndex(index).dateFrom,
          placePerformance: this.listActionUnion.elementAtIndex(index).placePerformance,
          position: this.listActionUnion.elementAtIndex(index).position,
          postionTallest: this.listActionUnion.elementAtIndex(index).postionTallest
        });
        break;
    }
  }
}

interface DetailActionParty {
  dateFrom: string,
  placePerformance: string,
  position: [''],
  positionOther: boolean,
  now: boolean
}

interface DetailActionUnion {
  dateFrom: string,
  placePerformance: string,
  position: [''],
  postionTallest: string,
}
